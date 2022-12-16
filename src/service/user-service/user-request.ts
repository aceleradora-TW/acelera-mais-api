import { Message } from "@messages/languages/pt-br"
import { UserRegistrationStatus } from "@service/Flags"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { Roles } from "./Roles"
import md5 from "md5"
import { isLocal } from "../../utils/islocal"

export const UserRequest = ({ params, body }) => {
  const { EMAIL_RESENT, USER_DISABLED, USER_ENABLED, USER_FROM_LINK } =
    UserRegistrationStatus
  const { name, email, password, telephone, type, flag = false } = body
  const { id } = params

  const isValidType = () => {
    const { ADMIN, MENTOR } = Roles
    const types = [ADMIN, MENTOR]
    return type && types.includes(type)
  }

  const isValidFlag = () => {
    const flags = [USER_DISABLED, USER_ENABLED, USER_FROM_LINK]
    return flag && flags.includes(flag)
  }

  const isRequired = () => {
    return name && email && telephone && type && (isUserFromLink() || !flag)
  }

  const encryptPassword = (password) => md5(password)

  const generatePassword = () => {
    if (password) {
      return {
        encryptedPassword: encryptPassword(password),
        decodedPassword: password,
      }
    }
    const randomPassword = isLocal()
      ? "123"
      : Math.random().toString(36).slice(-10)
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
      return { ...user, id: id }
    }
    throw new HttpError(Message.CREATE_ERROR, HttpStatusCode.BAD_REQUEST)
  }

  const isUserFromLink = () => {
    const { USER_FROM_LINK } = UserRegistrationStatus
    return flag === USER_FROM_LINK
  }

  const firstLogin = () => {
    let user = isValidBodyForCreateUser()
    const { FIRST_LOGIN, USER_ENABLED } = UserRegistrationStatus

    const passwords = generatePassword()

    return {
      ...user,
      password: passwords.encryptedPassword,
      decodedPassword: passwords.decodedPassword,
      flag: isUserFromLink() ? USER_ENABLED : FIRST_LOGIN,
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

  const getEmail = () => {
    let email = { ...body }
    return email
  }

  return {
    firstLogin,
    getUser,
    getUserForResendEmail,
    getUserUpdate,
    getEmail,
  }
}
