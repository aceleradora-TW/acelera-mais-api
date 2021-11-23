const jwt = require('jsonwebtoken')
require('dotenv').config()

export const generateAccessToken = (request, response) => {
  const emailAdmin = process.env.EMAIL_ADMIN
  const passwordAdmin = process.env.PASSWORD_ADMIN
  const nameAdmin = process.env.NAME_ADMIN
  const secret = process.env.SECRET
  const emailUser = request.body.email
  const passwordUser = request.body.password

  if (emailUser !== emailAdmin || passwordUser !== passwordAdmin) {
    return response.sendStatus(401)
  }

  const payload = { name: nameAdmin, email: emailAdmin }
  const accessToken = jwt.sign(payload, secret)

  return response.json({
    auth: true,
    accessToken: accessToken,
    user: payload
  })
}

export const verifyAccessToken = (request, response, next) => {
  const authHeaders = request.headers.authorization
  const accessToken = authHeaders && authHeaders.split(' ')[1]

  const isAuthenticated = jwt.verify(
    accessToken,
    process.env.SECRET,
    (err) => {
      return !err
    }
  )

  if (isAuthenticated) {
    next()
  } else {
    return response.sendStatus(401)
  }
}
