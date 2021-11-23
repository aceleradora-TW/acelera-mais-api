const jwt = require('jsonwebtoken')

export const generateAccessToken = (request, response) => {
  const { EMAIL_ADMIN, PASSWORD_ADMIN, NAME_ADMIN, SECRET } = process.env
  const emailUser = request.body.email
  const passwordUser = request.body.password
  console.log(EMAIL_ADMIN)

  if (emailUser !== EMAIL_ADMIN || passwordUser !== PASSWORD_ADMIN) {
    return response.sendStatus(401)
  }

  const payload = { name: NAME_ADMIN, email: EMAIL_ADMIN }
  const accessToken = jwt.sign(payload, SECRET, {
    expiresIn: 3600
  })

  return response.json({
    auth: true,
    accessToken: accessToken,
    user: payload
  })
}

export const verifyAccessToken = (request, response, next) => {
  const { SECRET } = process.env
  const authHeaders = request.headers.authorization
  const accessToken = authHeaders && authHeaders.split(' ')[1]

  const isAuthenticated = jwt.verify(
    accessToken,
    SECRET,
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
