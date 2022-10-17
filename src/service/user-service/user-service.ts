import {
  inviteEmailContent,
  rememberEmailContent,
} from "@messages/email/content"
import { User } from "@models/entity/User"
import { EmailService } from "@service/email/EmailService"
import { UserRegistrationStatus } from "@service/Flags"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { validate } from "class-validator"
import { getRepository } from "typeorm"
import { UserRequest } from "./user-request"
import md5 from "md5"
import { userRequest } from "@service/user/UserRequest"

export const userService = (request) => {
  const userRepository = getRepository(User)

  const sendEmail = (user, context) => {
    const { from, subject, content } = context
    EmailService().send(from, subject, user.email, content(user))
  }

  const resendEmail = async () => {
    const encryptPassword = (password) => md5(password)
    const generatePassword = () => {
      const randomPassword = Math.random().toString(36).slice(-10)
      return {
        encryptedPassword: encryptPassword(randomPassword),
        decodedpassword: randomPassword,
      }
    }
    const { FIRST_LOGIN, EMAIL_RESENT } = UserRegistrationStatus
    const user = UserRequest(request).getUserForResendEmail()
    console.log(user)
    const passwords = generatePassword()
    const password = passwords.encryptedPassword
    const decodedpassword = passwords.decodedpassword
    const userEntity = await userRepository.findOneOrFail({ email: user.email })
    console.log(userEntity)
    console.log(decodedpassword)
    if (userEntity.flag === FIRST_LOGIN) {
      userEntity.flag = EMAIL_RESENT
      userEntity.password = password
      return await userRepository.save(userEntity)
    }
    const emailuser = {
      name: userEntity.name,
      password: decodedpassword,
      email: user.email,
    }
    sendEmail(emailuser, rememberEmailContent)
    return {}
  }

  const validateEntity = async (entity) => {
    const errors = await validate(entity)

    if (errors.length > 0) {
      throw new HttpError(
        "Errors validating the user:" + errors,
        HttpStatusCode.NOT_FOUND
      )
    }
  }

  const createUser = async () => {
    const user = UserRequest(request).firstLogin()
    const { name, email, telephone, type, flag, passwords } = user
    const password = passwords.encryptedPassword
    const decodedpassword = passwords.decodedpassword
    const findUser = await userRepository.findOne({ email: email })
    if (findUser) {
      throw new HttpError(
        "User already exist in database",
        HttpStatusCode.CONFLICT
      )
    }

    const userEntity = userRepository.create({
      name,
      email,
      telephone,
      type,
      flag,
      password,
    })
    validateEntity(userEntity)
    const saveUser = await userRepository.save(userEntity)
    const emailuser = {
      name: name,
      password: decodedpassword,
      email: email,
    }
    sendEmail(emailuser, inviteEmailContent)
    return saveUser
  }

  const updateUser = async () => {
    const user = UserRequest(request).getUser()
    let userEntity = await userRepository.findOne(user.id)
    const { name, email, telephone, type, flag, password } = user
    if (!userEntity) {
      throw new HttpError(
        `User not found with: ${user.id}`,
        HttpStatusCode.BAD_REQUEST
      )
    }

    if (password) {
      userEntity.password = md5(password)
    }

    if (name) {
      userEntity.name = name
    }
    if (email) {
      userEntity.email = email
    }
    if (telephone) {
      userEntity.telephone = telephone
    }
    if (type) {
      userEntity.type = type
    }
    if (flag) {
      userEntity.flag = flag
    }

    return await userRepository.save(userEntity)
  }

  const getAllUser = async () => {
    return await userRepository.find()
  }

  return {
    createUser,
    updateUser,
    getAllUser,
    resendEmail,
  }
}
