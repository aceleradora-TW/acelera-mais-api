import { message } from "@messages/languages/pt-br"
import { Exercise } from "@models/entity/Exercise"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { getRepository } from "typeorm"

export class ExerciseService {
  public async getAllExercisesService(page, count, hiringProcessId) {
    const exerciseRepository = getRepository(Exercise)
    const result = await exerciseRepository.createQueryBuilder()
      .select("exercise")
      .from(Exercise, "exercise")
      .where("exercise.hiringProcess = :id", { id: hiringProcessId })
      .leftJoinAndSelect("exercise.hiringProcess", "hiringProcess")
      .skip(page)
      .take(count)
      .getMany()
    if (result.length === 0) {
      throw new HttpError(message.NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }
    return result
  }

  public async editType(id, type) {
    const exerciseRepository = getRepository(Exercise)
    const exercise = await exerciseRepository.findOne(id)
    if (!exercise) {
      throw new HttpError('Exercise not found with: ' + id, HttpStatusCode.BAD_REQUEST)
    }
    if (type) {
      exercise.type = type
    }
    await exerciseRepository.save(exercise)
    return await exerciseRepository.findOne(id)
  }
}

