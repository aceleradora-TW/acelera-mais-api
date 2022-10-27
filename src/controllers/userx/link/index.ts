import JWT from "jsonwebtoken"
import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { Message } from "@messages/languages/pt-br"

export const createLink = async (request, response) => {
  const dateLink = {
    link: `user/${JWT.sign({ role: "admin" }, process.env.SECRET, {
      expiresIn: "30m",
    })}`,
  }
  return await httpResponseHandler().createSuccessResponse(
    Message.FOUND,
    dateLink,
    response
  )
}

export const verifyLink = async (request, response) => {
  return await httpResponseHandler().createSuccessResponse(
    Message.FOUND,
    { verified: true },
    response
  )
}
