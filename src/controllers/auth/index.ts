const jwt = require('jsonwebtoken')

export const generateAccessToken = (request, response) => {
  const emailAdmin = process.env.EMAIL_ADMIN || 'ju@gmail.com'
  const passwordAdmin = process.env.PASSWORD_ADMIN || '1234'
  const nameAdmin = process.env.NAME || 'Juliane Martins'
  const secret = process.env.SECRET || '37344bf30d788a83a4bae18cb07c2141d5e33a727215f5e6e860ea2a983d38cf5b0b125d3c0ec3abb6a16d1224f42814461e216b695d6639f17a985e6e0b869c'
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
  console.log(accessToken)

  // precisamos conferir se a verificação está correta
  const isAuthenticated = jwt.verify(accessToken, process.env.SECRET, (err) => {
    if (err) {
      return !err
    }
  })

  if (isAuthenticated) {
    return response.sendStatus(401)
  }

  next()
}
