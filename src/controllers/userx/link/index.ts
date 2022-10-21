import JWT from "jsonwebtoken"
import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { Message } from "@messages/languages/pt-br"

export const createLink = async (request, response) => {
  const dateLink = {
    link:
      "user/" + JWT.sign({ date: new Date().valueOf() }, process.env.SECRET),
  }
  return await httpResponseHandler().createSuccessResponse(
    Message.FOUND,
    dateLink,
    response
  )
}

export const verifyLink = async (request, response) => {
  const webJWT = await request.params.token
  console.log(webJWT)
}
