import { message } from "@messages/languages/pt-br"
import { Exercise } from "@models/entity/Exercise"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { getRepository } from "typeorm"

export class ExerciseService {
  public async getAllExercises({ page, count, hiringProcessId, type = 'none' }) {
    const exerciseRepository = getRepository(Exercise)
    const result = await exerciseRepository.find({
      where: {
        hiringProcess: hiringProcessId,
        type: type
      },
      skip: page,
      take: count
    })
    if (result.length === 0) {
      throw new HttpError(message.NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }
    return result
  }
}