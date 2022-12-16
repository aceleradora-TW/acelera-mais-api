import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { inviteEmailContent, rememberEmailContent } from "@messages/email/content"
import { Message } from "@messages/languages/pt-br"
import { User } from "@models/entity/User"
import { EmailService } from "@service/email/EmailService"
import { userService } from "@service/user-service/user-service"
import { getRepository } from "typeorm"

const httpResponse = httpResponseHandler()

export const createUser = async (request, response) => {
  try {
    const result = await userService(request).createUser()
    return httpResponseHandler().createSuccessResponse(
      Message.EMAIL_SENT,
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
    return httpResponse.createSuccessResponse(Message.UPDATED, result, response)
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}

export const getUser = async (request, response) => {
  try {
    const result = await userService(request).getAllUser()
    return httpResponse.createSuccessResponse(Message.FOUND, result, response)
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}

export const resendEmail = async (request, response) => {
  try {
    const result = userService(request).resendEmail()
    return httpResponseHandler().createSuccessResponse(
      Message.EMAIL_SENT,
      result,
      response
    )
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}

export const sendPassword = async (response, request) => {
  try {
    const { email } = request.body
    const userRepository = getRepository(User)
    const userEntity = await userRepository.findOneOrFail({ where: { email } })
    const { from, subject, content } = inviteEmailContent
    EmailService().send(from, subject, userEntity.email, content(userEntity))
    return response.json({ message: Message.EMAIL_SENT })
  } catch (error) {
    return response.json({ message: Message.EMAIL_NOT_SENT })
  }
}