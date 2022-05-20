import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "@messages/languages/pt-br"
import { userRequest } from "@service/user/UserRequest"
import { userService } from "@service/user/UserService"


export const createUser = async (request, response) => {
  try {
    const user = userRequest().convertFromHttpBody(request.body)
    const result = await userService().createUserService(user)
    return httpResponseHandler().createSuccessResponse(message.SUCCESS, result, response)
  } catch (error) {
    return httpResponseHandler().createErrorResponse(error, response)
  }
}
