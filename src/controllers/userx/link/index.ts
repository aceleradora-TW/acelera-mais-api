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
  const answer = {
    verified: JWT.verify(webJWT, process.env.SECRET, (err, decoded) => {
      const time = new Date().valueOf() - decoded.date
      return time / (1000 * 60) < 30 ? true : false
    }),
  }
  return await httpResponseHandler().createSuccessResponse(
    Message.FOUND,
    answer,
    response
  )
}
