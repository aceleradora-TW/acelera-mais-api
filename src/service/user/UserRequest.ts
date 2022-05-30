const jwt = require('jsonwebtoken')

export const userRequest = () => {
  const passwordGenerator = () => {
    const { SECRET_PASSWORD } = process.env
    const randomPassword = Math.random().toString(36).slice(-10)
    const encryptedPassword = jwt.sign(randomPassword, SECRET_PASSWORD);
    return encryptedPassword
  }

  const convertFromHttpBody = (body) => {
    const { name, telephone, email, type } = body
    return {
      name,
      telephone: telephone || '',
      email,
      type,
      password: passwordGenerator()
    }
  }
  return { convertFromHttpBody }
}