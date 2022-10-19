import { Message } from "@messages/languages/pt-br"
import { UserRegistrationStatus } from "@service/Flags"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { Roles } from "./Roles"
import md5 from "md5"

export const UserRequest = ({ params, body, query }) => {
  const { FIRST_LOGIN, EMAIL_RESENT, USER_DISABLED, USER_ENABLED } =
    UserRegistrationStatus
  const { name, email, password, telephone, type, flag } = body
  const { id } = params

  const isValidType = () => {
    const { ADMIN, MENTOR } = Roles
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

  const encryptPassword = (password) => md5(password)

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(-10)
    return {
      encryptedPassword: encryptPassword(randomPassword),
      decodedPassword: randomPassword,
    }
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
        id: id,
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
    const passwords = generatePassword()
    return {
      ...user,
      password: passwords.encryptedPassword,
      decodedPassword: passwords.decodedPassword,
      flag: FIRST_LOGIN,
    }
  }

  const getUserForResendEmail = () => {
    const passwords = generatePassword()
    return {
      id: id,
      encryptedPassword: passwords.encryptedPassword,
      decodedPassword: passwords.decodedPassword,
      flag: EMAIL_RESENT,
    }
  }

  const getUserUpdate = () => {
    return isValidBodyForUpdateUser()
  }

  const getUser = () => {
    const user = isValidBodyForUpdateUser()
    return {
      id,
      ...user,
    }
  }

  return {
    firstLogin,
    getUser,
    getUserForResendEmail,
    getUserUpdate,
  }
}
