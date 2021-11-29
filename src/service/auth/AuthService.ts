import { HttpError, HttpStatusCode } from '../HttpError'

const jwt = require('jsonwebtoken')

export const createAccessToken = (emailUser, passwordUser) => {
  const { EMAIL_ADMIN, PASSWORD_ADMIN, NAME_ADMIN, SECRET } = process.env

  if (emailUser !== EMAIL_ADMIN || passwordUser !== PASSWORD_ADMIN) {
    throw new HttpError('Unauthorized', HttpStatusCode.UNAUTHORIZED)
  }

  const payload = { name: NAME_ADMIN, email: EMAIL_ADMIN }
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
