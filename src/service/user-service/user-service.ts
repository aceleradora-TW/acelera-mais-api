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

export const userService = (request) => {
  const userRepository = getRepository(User)

  const sendEmail = (user, context) => {
    const { from, subject, content } = context
    EmailService().send(from, subject, user.email, content(user))
  }

  const resendEmail = async () => {
    const { FIRST_LOGIN, EMAIL_RESENT } = UserRegistrationStatus
    const user = UserRequest(request).getUserForResendEmail()
    const userEntity = await userRepository.findOneOrFail({ email: user.email })

    sendEmail(userEntity, rememberEmailContent)

    if (userEntity.flag === FIRST_LOGIN) {
      userEntity.flag = EMAIL_RESENT
      return await userRepository.save(userEntity)
    }

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
    // recebe a request, valida e prepara o payload
    const user = UserRequest(request).firstLogin()
    // cria a entidade de usuario
    const userEntity = await userRepository.create(user)
    // valida
    validateEntity(userEntity)

    // envia email para usuário criado
    sendEmail(user, inviteEmailContent)

    // salva a entidade criada ao banco
    return await userRepository.save(userEntity)
  }

  const updateUser = async () => {
    const user = UserRequest(request).getUser()
    let userEntity = await userRepository.findOne(user.id)
    if (!userEntity) {
      throw new HttpError(
        `User not found with: ${user.id}`,
        HttpStatusCode.BAD_REQUEST
      )
    }
    userEntity = {
      ...userEntity,
      ...user,
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
