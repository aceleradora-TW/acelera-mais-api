import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "@messages/languages/pt-br"
import { userService } from "@service/user-service/user-service"

const httpResponse = httpResponseHandler()

export const createUser = async (request, response) => {
  try {
    const result = await userService(request).createUser()
    return httpResponseHandler().createSuccessResponse(
      message.EMAIL_SENT,
      result,
      response
    )
  } catch (error) {
    return httpResponseHandler().createErrorResponse(error, response)
  }
}

export const updateUser = async (request, response) => {
  try {
    const result = await userService(request).updateUser()
    return httpResponse.createSuccessResponse(message.UPDATED, result, response)
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}

export const getUser = async (request, response) => {
  try {
    const result = await userService(request).getAllUser()
    return httpResponse.createSuccessResponse(message.FOUND, result, response)
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}

export const resendEmail = async (request, response) => {
  try {
    const result = userService(request).resendEmail()
    return httpResponseHandler().createSuccessResponse(
      message.EMAIL_SENT,
      result,
      response
    )
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}
