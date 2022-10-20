import JWT from "jsonwebtoken"
import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { Message } from "@messages/languages/pt-br"

export const createLink = (request, response) => {
  const dateLink = "user/" + JWT.sign({ date: new Date().valueOf() })
  return httpResponseHandler().createSuccessResponse(
    Message.FOUND,
    dateLink,
    response
  )
}
