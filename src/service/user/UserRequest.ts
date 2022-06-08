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

  return { convertFromHttpBody, rememberEmailBody }
}
