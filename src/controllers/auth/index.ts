import { HttpResponseHandler } from '@controllers/HttpResponseHandler'
import { createAccessToken, validateAccessToken } from '../../service/auth/AuthService'
const responseHandler = new HttpResponseHandler()

export const generateAccessToken = (request, response) => {
  const emailUser = request.body.email
  const passwordUser = request.body.password

  try {
    const tokenPayload = createAccessToken(emailUser, passwordUser)
    return response.json(tokenPayload)
  } catch (error) {
    return responseHandler.createErrorResponse(error, response)
  }
}

export const verifyAccessToken = (request, response, next) => {
  const authHeaders = request.headers.authorization

  const isAuthenticated = validateAccessToken(authHeaders)

  if (isAuthenticated) {
    next()
  } else {
    return response.sendStatus(401)
  }
}
