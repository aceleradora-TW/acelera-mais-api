import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "@messages/languages/pt-br"
import { userRequest } from "@service/user/UserRequest"
import { userService } from "@service/user/UserService"

const httpResponse = httpResponseHandler()

export const createUser = async (request, response) => {
  try {
    const user = userRequest().convertFromHttpBody(request.body)
    const result = await userService().createUserService(user)
    return httpResponseHandler().createSuccessResponse(message.SUCCESS, result, response)
  } catch (error) {
    return httpResponseHandler().createErrorResponse(error, response)
  }
}

export const updateUser = async (request, response) => {
  try {
    const { name, email, telephone, type } = request.body
    const { id } = request.params
    const userUpdated = await userService().editUser({
      id,
      name,
      email,
      telephone,
      type
    })
    return httpResponse.createSuccessResponse(message.UPDATED, userUpdated, response)
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}
