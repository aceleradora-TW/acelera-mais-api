import { HttpError, HttpStatusCode } from '../HttpError'
import { findUserByEmail } from './AuthRequest'

const jwt = require('jsonwebtoken')

export const createAccessToken = async (emailUser, passwordUser) => {
  const { SECRET, NODEMAILER_SECRET } = process.env

  const encodePassword = jwt.sign(passwordUser, NODEMAILER_SECRET)

  const user = await findUserByEmail(emailUser)


  if (!user || user.password !== encodePassword) {
    throw new HttpError('Unauthorized', HttpStatusCode.UNAUTHORIZED)
  }

  const payload = { name: user.name, email: user.email, role: user.type }
  const accessToken = jwt.sign(payload, SECRET)

  return {
    auth: true,
    accessToken,
    user: payload
  }
}

export const validateAccessToken = (authHeaders) => {
  const { SECRET } = process.env
  const accessToken = authHeaders && authHeaders.split(' ')[1]

  const isAuthenticated = jwt.verify(
    accessToken,
    SECRET,
    (err) => {
      return !err
    }
  )
  return isAuthenticated
}
