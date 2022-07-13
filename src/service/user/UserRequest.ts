import { message } from "@messages/languages/pt-br"
import { HttpError, HttpStatusCode } from "@service/HttpError"
const jwt = require("jsonwebtoken")
import { UserRegistrationStatus } from "@service/Flags"

export const encryptPassword = (password) => {
  const { NODEMAILER_SECRET } = process.env
  const encryptedPassword = jwt.sign(password, NODEMAILER_SECRET)
  return encryptedPassword
}

export const userRequest = () => {
  const randomPassword = Math.random().toString(36).slice(-10)

  const convertFromHttpBody = (body) => {
    const { name, telephone, email, type, flag } = body
    if (validateFlag(flag)) {
      return {
        name,
        telephone: telephone || "",
        email,
        type,
        password: encryptPassword(randomPassword),
        flag,
      }
    }
    throw new HttpError(message.CREATE_ERROR, HttpStatusCode.BAD_REQUEST)
  }

  const validateFlag = (flag) => {
    return Object.values(UserRegistrationStatus).includes(flag)
  }

  const rememberEmailBody = (body) => {
    const { name, email, password } = body
    return {
      name,
      email,
      password,
    }
  }

  return { convertFromHttpBody, rememberEmailBody }
}
