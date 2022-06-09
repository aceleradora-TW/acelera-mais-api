import { User } from "@models/entity/User"
import { getRepository } from "typeorm"
const jwt = require("jsonwebtoken")

export const userRequest = () => {
  const passwordGenerator = () => {
    const { NODEMAILER_SECRET } = process.env
    const randomPassword = Math.random().toString(36).slice(-10)
    const encryptedPassword = jwt.sign(randomPassword, NODEMAILER_SECRET)
    return encryptedPassword
  }

  const convertFromHttpBody = (body) => {
    const { name, telephone, email, type, flag } = body
    return {
      name,
      telephone: telephone || "",
      email,
      type,
      password: passwordGenerator(),
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

  const findUserByEmail = async (email) => {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ email })
    return user
  }

  return { convertFromHttpBody, findUserByEmail, rememberEmailBody }
}
