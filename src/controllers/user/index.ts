import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "@messages/languages/pt-br"
import { userRequest } from "@service/user/UserRequest"
import { userService } from "@service/user/UserService"
import { getRepository } from 'typeorm'
import { User } from '@models/entity/User'


export const createUser = async (request, response) => {
  try {
    const user = userRequest().convertFromHttpBody(request.body)
    const result = await userService().createUserService(user)
    return httpResponseHandler().createSuccessResponse(message.SUCCESS, result, response)
  } catch (error) {
    return httpResponseHandler().createErrorResponse(error, response)
  }
}

export const getUser = async (request, response) => {
  try {
    const userRepository = getRepository(User)
    let user = await userRepository.find()
    return response.status(200).json(user)
  } catch (error) {
    return response.status(500).json(error)
  }
 }
