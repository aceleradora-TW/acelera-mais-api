import { HttpError, HttpStatusCode } from '../HttpError'

const jwt = require('jsonwebtoken')

export const createAccessToken = (emailUser, passwordUser) => {
  const { USERS, SECRET } = process.env
  console.log({ USERS })
  const listUsers = JSON.parse(USERS)
  const emailFound = listUsers.filter(users => users.email == emailUser)

  if (emailFound.length === 0 || emailFound[0].password !== passwordUser) {
    throw new HttpError('Unauthorized', HttpStatusCode.UNAUTHORIZED)
  }

  const payload = { name: emailFound[0].name, email: emailFound[0].email, role: emailFound[0].role }
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
