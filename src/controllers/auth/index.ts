import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import {
  createAccessToken,
  validateAccessToken,
} from "../../service/auth/AuthService"
const responseHandler = httpResponseHandler()

export const generateAccessToken = async (request, response) => {
  const emailUser = request.body.email
  const passwordUser = request.body.password

  try {
    const tokenPayload = await createAccessToken(emailUser, passwordUser)
    return response.json(tokenPayload)
  } catch (error) {
    return responseHandler.createErrorResponse(error, response)
  }
}

export const verifyAccessToken = (roles) => (request, response, next) => {
  const { authorization } = request.headers

  if (validateAccessToken(authorization, roles)) {
    return next()
  }
  return response.sendStatus(401)
}
