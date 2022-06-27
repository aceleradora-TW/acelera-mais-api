import { getRepository } from "typeorm"
import { validate } from "class-validator"
import { User } from "@models/entity/User"
import { HttpError, HttpStatusCode } from "../HttpError"
import { EmailService } from "@service/email/EmailService"
import {
  inviteEmailContent,
  rememberEmailContent,
} from "@messages/email/content"
import { encryptPassword } from "./UserRequest"

export const userService = () => {
  const sendUserCreatedEmail = (user) =>
    EmailService().sendEmail(user, inviteEmailContent)

  const sendUserRememberEmail = async (user) =>
    EmailService().sendEmail(user, rememberEmailContent)

  const createUserService = async (userRequest: any) => {
    const userRepository = getRepository(User)
    const userEntity = await userRepository.create(userRequest)
    validateUser(userEntity)
    sendUserCreatedEmail(userRequest)
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
  const editUser = async ({
    id,
    name,
    email,
    telephone,
    type,
    flag,
    password,
  }) => {
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
    if (password) {
      console.log(password)
      user.password = encryptPassword(password)
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

  return {
    createUserService,
    editUser,
    sendUserRememberEmail,
    editUserFlag,
    findUserByEmail,
  }
}
