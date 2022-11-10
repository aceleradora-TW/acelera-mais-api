import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import {
  createAccessToken,
  validateAccessToken,
  getRoleToken,
} from "@service/auth/AuthService"
import { Roles } from "@service/user-service/Roles"
import { UserRegistrationStatus } from "@service/Flags"
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

export const verifyGuest = (request, responde, next) => {
  const { authorization } = request.headers
  const role = getRoleToken(authorization)
  const { MENTOR, GUEST } = Roles
  const { USER_ENABLED, FIRST_LOGIN } = UserRegistrationStatus
  const body = request.body
  request.body.flag = FIRST_LOGIN

  if (role === GUEST) {
    request.body = {
      ...body,
      type: MENTOR,
      flag: USER_ENABLED,
    }
  }
  next()
}
