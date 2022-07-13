import { Exercise } from "@models/entity/Exercise"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { validate } from "class-validator"
import { getRepository } from "typeorm"

export const getExercise = async (request, response) => {
  const { id } = request.params
  const exerciseRepository = getRepository(Exercise)
  const exercise = await exerciseRepository.findOne(id)
  return response.json({ exercise })
}

export const updateExercise = async (request, response) => {
  const validateExercise = async ({ exercise }) => {
    const errors = await validate(exercise)
    if (errors.length > 0) {
      throw new HttpError(
        "Errors validating the evaluation:" + errors,
        HttpStatusCode.BAD_REQUEST
      )
    }
    return validateExercise
  }

  const { id } = request.params
  const { exerciseType } = request.body
  const exerciseRepository = getRepository(Exercise)
  const exercise = await exerciseRepository.findOne(id)
  if (!exercise) {
    throw new HttpError(
      "Evaluation not found with: " + id,
      HttpStatusCode.BAD_REQUEST
    )
  }

  if (exerciseType) {
    exercise.exerciseType = exerciseType
  }

  validateExercise({ exercise })
  const result = await exerciseRepository.save(exercise)
  return result
}
