import { Exercise } from "@models/entity/Exercise"
import { getRepository } from "typeorm"

export const getExercise = async (request, response) => {
  const { id } = request.params
  const exerciseRepository = getRepository(Exercise)
  const exercise = await exerciseRepository.findOne(id)
  return response.json({ exercise })
}
