import { Message } from "@messages/languages/pt-br"
import { UserRegistrationStatus } from "@service/Flags"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { UserType } from "./Types"
import jwt from "jsonwebtoken"

export const UserRequest = ({ params, body, query }) => {
  const { NODEMAILER_SECRET } = process.env
  const { FIRST_LOGIN, EMAIL_RESENT, USER_DISABLED, USER_ENABLED } =
    UserRegistrationStatus
  const { name, email, password, telephone, type, flag } = body
  const { id } = params

  const isValidType = () => {
    const { ADMIN, MENTOR } = UserType
    const types = [ADMIN, MENTOR]
    return type && types.includes(type)
  }

  const isValidFlag = () => {
    const flags = [USER_DISABLED, USER_ENABLED]
    return flag && flags.includes(flag)
  }

  const isRequired = () => {
    return name && email && telephone && type && !flag
  }

  const encryptPassword = (password) => jwt.sign(password, NODEMAILER_SECRET)

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(-10)
    return encryptPassword(randomPassword)
  }

  const isValidBodyForCreateUser = () => {
    if (isRequired() && isValidType()) {
      return { ...body }
    }
    throw new HttpError(Message.CREATE_ERROR, HttpStatusCode.BAD_REQUEST)
  }

  const isValidBodyForUpdateUser = () => {
    let user = { ...body }
    if (password) {
      user = {
        ...user,
        password: encryptPassword(password),
        flag: USER_ENABLED,
      }
    }

    if (!flag || isValidFlag()) {
      return { ...user }
    }
    throw new HttpError(Message.CREATE_ERROR, HttpStatusCode.BAD_REQUEST)
  }

  const firstLogin = () => {
    const user = isValidBodyForCreateUser()
    return {
      ...user,
      password: generatePassword(),
      flag: FIRST_LOGIN,
    }
  }

  const getUser = () => {
    const user = isValidBodyForUpdateUser()
    return {
      id,
      ...user,
    }
  }

  const getUserForResendEmail = () => {
    if (email && id) {
      return {
        email,
        flag: EMAIL_RESENT,
      }
    }
    throw new HttpError(Message.CREATE_ERROR, HttpStatusCode.BAD_REQUEST)
  }

  return {
    firstLogin,
    getUser,
    getUserForResendEmail,
  }
}
