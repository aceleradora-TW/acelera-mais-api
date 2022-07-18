import { Message } from "@messages/languages/pt-br"
import { HttpError, HttpStatusCode } from "@service/HttpError"
const jwt = require("jsonwebtoken")
import { UserRegistrationStatus } from "@service/Flags"

export const userRequest = () => {
  const passwordGenerator = () => {
    const { NODEMAILER_SECRET } = process.env
    const randomPassword = Math.random().toString(36).slice(-10)
    const encryptedPassword = jwt.sign(randomPassword, NODEMAILER_SECRET)
    return encryptedPassword
  }

  const convertFromHttpBody = (body) => {
    const { name, telephone, email, type, flag } = body
    if (validateFlag(flag)) {
      return {
        name,
        telephone: telephone || "",
        email,
        type,
        password: passwordGenerator(),
        flag,
      }
    }
    throw new HttpError(Message.CREATE_ERROR, HttpStatusCode.BAD_REQUEST)
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
