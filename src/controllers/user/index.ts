import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "@messages/languages/pt-br"
import { User } from "@models/entity/User"
import { userRequest } from "@service/user/UserRequest"
import { userService } from "@service/user/UserService"
import { getRepository } from "typeorm"


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

export const deleteUser = async (request, response) => {
  try {
    const UserRepository = getRepository(User)
    const result = await UserRepository.delete(request.params.id)
    if (result.affected === 0) {
      return response.status(410).json({ message: message.NOT_REMOVED })
    }
    return response.json({ message: message.REMOVED, result })
  } catch (error) {
    return response.status(500).json(error)
  }
}
