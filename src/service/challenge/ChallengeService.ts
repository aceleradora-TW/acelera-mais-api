import { Message } from "@messages/languages/pt-br"
import { Challenge } from "@models/entity/Challenge"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { getSkip } from "src/utils/getSkip"
import { getRepository } from "typeorm"

export const challengeService = () => {
  const getAllChallenges = async ({
    page = 0,
    limit,
    hiringProcessId,
    type,
    orderBy = "createdAt",
    orientation = "ASC",
  }) => {
    let where = { hiringProcess: { id: hiringProcessId } }
    if (type) {
      where = { ...where }
    }
    const challengeRepository = getRepository(Challenge)
    const [list, count] = await challengeRepository.findAndCount({
      where: where,
      order: {
        [orderBy]: orientation,
      },
      skip: getSkip(page - 1, limit),
      take: limit,
    })

    return {
      challenge: list,
      count: count,
    }
  }
}
