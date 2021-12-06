import { Exercise } from "@models/entity/Exercise"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { getRepository } from "typeorm"

export class ExerciseService {
  public async getAllExercisesService(page, count) {
    const exerciseRepository = getRepository(Exercise)
    const exercises = await exerciseRepository.find({take:count, skip:page})
    if(exercises.length == 0) {
      throw new HttpError("Não foram encontradas informações.", HttpStatusCode.NOT_FOUND)
    }
    return exercises
  }
}