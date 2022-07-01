import { getRepository } from "typeorm"
import { validate } from "class-validator"
import { User } from "@models/entity/User"
import { HttpError, HttpStatusCode } from "../HttpError"
import { EmailService } from "@service/email/EmailService"
import {
  inviteEmailContent,
  rememberEmailContent,
} from "@messages/email/content"
import { UserRegistrationStatus } from "@service/Flags"
const jwt = require("jsonwebtoken")

export const userService = () => {
  const sendEmail = (user, message) => {
    const { from, subject, content } = message
    const { name, password, email } = user
    const { NODEMAILER_SECRET } = process.env
    const decodedPassword = jwt.verify(password, NODEMAILER_SECRET)
    EmailService().send(from, subject, email, content(name, decodedPassword))
  }

  const inviteEmail = (user) => sendEmail(user, inviteEmailContent)

  const rememberEmail = async (user) => sendEmail(user, rememberEmailContent)

  const createUserService = async (userRequest: any) => {
    const userRepository = getRepository(User)
    const userEntity = await userRepository.create(userRequest)
    validateUser(userEntity)
    inviteEmail(userRequest)
    const userEntitySaved = await userRepository.save(userEntity)
    return userEntitySaved
  }

  const validateUser = async (user) => {
    const errors = await validate(user)
    if (errors.length > 0) {
      throw new HttpError(
        "Errors validating the user:" + errors,
        HttpStatusCode.NOT_FOUND
      )
    }
  }
  const editUser = async ({ id, name, email, telephone, type, flag }) => {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne(id)
    if (!user) {
      throw new HttpError(
        "User not found with: " + id,
        HttpStatusCode.BAD_REQUEST
      )
    }

    if (name) {
      user.name = name
    }
    if (email) {
      user.email = email
    }
    if (telephone) {
      user.telephone = telephone
    }
    if (type) {
      user.type = type
    }
    if (flag) {
      user.flag = flag
    }
    validateUser(user)
    const result = await userRepository.save(user)
    return result
  }

  const editUserFlag = async ({ id, flag }) => {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne(id)
    if (!user) {
      throw new HttpError(
        "User not found with: " + id,
        HttpStatusCode.BAD_REQUEST
      )
    }
    if (flag) {
      user.flag = flag
    }
    validateUser(user)
    const result = await userRepository.save(user)
    return result
  }

  const findUserByEmail = async (email) => {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ email })
    return user
  }

  const validateRegister = async (flag) => {
    if (Object.values(UserRegistrationStatus).includes(flag)) {
      return flag
    }
    return false
  }

  return {
    createUserService,
    editUser,
    rememberEmail,
    editUserFlag,
    findUserByEmail,
    validateRegister,
  }
}
