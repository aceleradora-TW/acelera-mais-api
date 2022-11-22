import { Message } from "@messages/languages/pt-br"
import { Challenge } from "@models/entity/Challenge"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { getRepository } from "typeorm"

export const challengeService = () => {
  const getAllChallenges = async ({
    page = 0,
    count,
    hiringProcessId,
    type,
    orderBy = "createdAt",
    orientation = "ASC",
  }) => {
    let where = { hiringProcess: { id: hiringProcessId } }
    if (type) {
      where = { ...where, type }
    }
    const challengeRepository = getRepository(Challenge)
    const result = await challengeRepository.find({
      where: where,
      order: {
        [orderBy]: orientation,
      },
      skip: page,
      take: count,
    })
    if (result.length === 0) {
      throw new HttpError(Message.NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }
    return result
  }

  return { getAllChallenges }
}
