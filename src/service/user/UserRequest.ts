const jwt = require('jsonwebtoken')

export const userRequest = () => {
  const passwordGenerator = () => {
    const { NODEMAILER_PASSWORD } = process.env
    const randomPassword = Math.random().toString(36).slice(-10)
    const encryptedPassword = jwt.sign(randomPassword, NODEMAILER_PASSWORD);
    return encryptedPassword
  }

  const convertFromHttpBody = (body) => {
    const { name, telephone, email, type, flag } = body
    return {
      name,
      telephone: telephone || '',
      email,
      type,
      password: passwordGenerator(),
      flag
    }
  }
  return { convertFromHttpBody }
}