import { message } from "@messages/languages/pt-br"
import { Exercise } from "@models/entity/Exercise"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { Brackets, getRepository } from "typeorm"

export class ExerciseService {
  public async getAllExercisesService(page, count, hiringProcessId, type, feedback) {
    const exerciseRepository = getRepository(Exercise)
    const result = await exerciseRepository.createQueryBuilder()
      .select("exercise")
      .from(Exercise, "exercise")
      .where("exercise.hiringProcess = :id", { id: hiringProcessId })
      .andWhere("exercise.type = :type", { type: type })
      .andWhere("exercise.feedback = :feedback", { feedback: feedback })
      .leftJoinAndSelect("exercise.hiringProcess", "hiringProcess")
      .skip(page)
      .take(count)
      .getMany()
    if (result.length === 0) {
      throw new HttpError(message.NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }
    return result
  }
}