import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "@messages/languages/pt-br"
import { User } from "@models/entity/User"
import { UserRegistrationStatus } from "@service/Flags"
import { userRequest } from "@service/user/UserRequest"
import { userService } from "@service/user/UserService"
import { getRepository } from "typeorm"

const httpResponse = httpResponseHandler()

export const createUser = async (request, response) => {
  try {
    const user = userRequest().convertFromHttpBody(request.body)
    const result = await userService().createUserService(user)
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
    const { name, email, telephone, type } = request.body
    const { id } = request.params
    const userUpdated = await userService().editUser({
      id,
      name,
      email,
      telephone,
      type,
    })
    return httpResponse.createSuccessResponse(
      message.UPDATED,
      userUpdated,
      response
    )
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
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
export const getUser = async (request, response) => {
  try {
    const userRepository = getRepository(User)
    let user = await userRepository.find()
    return response.status(200).json(user)
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const sendRememberEmail = async (request, response) => {
  try {
    const user = userRequest().rememberEmailBody(request.body)
    const { email } = user
    const { id } = request.params
    const flag = UserRegistrationStatus.EMAIL_RESENT
    const userEntity = await userRequest().findUserByEmail(email)
    await userService().editUserFlag({
      id,
      flag,
    })
    const result = userService().sendUserRememberEmail(userEntity)
    return httpResponseHandler().createSuccessResponse(
      message.EMAIL_SENT,
      result,
      response
    )
  } catch (error) {
    return response.status(500).json(error)
  }
}
