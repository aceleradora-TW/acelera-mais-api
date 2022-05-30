const jwt = require('jsonwebtoken')

export const passwordGenerator = () => {
  const { SECRET_PASSWORD } = process.env
  const randomPassword = Math.random().toString(36).slice(-10)
  const encryptedPassword = jwt.sign(randomPassword, SECRET_PASSWORD);
  return encryptedPassword
} 