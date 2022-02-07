import { message } from "@messages/languages/pt-br"
import { Challenge } from "@models/entity/Challenge"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { getRepository } from "typeorm"

export const challengeService = () => {

  const getAllChallenges = async ({ page, count, hiringProcessId, type }) => {
    let where = { hiringProcess: hiringProcessId }
    if (type) { where = { ...where, type } }
    const exerciseRepository = getRepository(Challenge)
    const result = await exerciseRepository.find({
      where,
      skip: page,
      take: count
    })
    if (result.length === 0) {
      throw new HttpError(message.NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }
    return result
  }

  return { getAllChallenges }
}