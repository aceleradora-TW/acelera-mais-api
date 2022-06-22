import { User } from "@models/entity/User"
import { getRepository } from "typeorm"
const jwt = require("jsonwebtoken")

export const encryptPassword = (password) => {
  const { NODEMAILER_SECRET } = process.env
  const encryptedPassword = jwt.sign(password, NODEMAILER_SECRET)
  return encryptedPassword
}

export const userRequest = () => {
  const randomPassword = Math.random().toString(36).slice(-10)

  const convertFromHttpBody = (body) => {
    const { name, telephone, email, type, flag } = body
    return {
      name,
      telephone: telephone || "",
      email,
      type,
      password: encryptPassword(randomPassword),
      flag,
    }
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
