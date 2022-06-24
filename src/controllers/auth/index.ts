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

export const verifyAccessToken = (request, response, next) => {
  if (process.env.NODE_ENV === "local") {
    next()
  }
  const authHeaders = request.headers.authorization

  const isAuthenticated = validateAccessToken(authHeaders)

  if (isAuthenticated) {
    next()
  } else {
    return response.sendStatus(401)
  }
}
