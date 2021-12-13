import { Evaluation } from "@models/entity/Evaluation"
import { getRepository } from "typeorm"

export const getEvaluations = async (request, response) => {
  const { page = 0, count = 50 } = request.query
  const evaluationRepository = getRepository(Evaluation)
  const evaluations = await evaluationRepository.find({ skip: page, take: count })
  return response.json({ evaluations })
}

export const getEvaluation = async (request, response) => {
  const { id } = request.params
  const evaluationRepository = getRepository(Evaluation)
  const evaluation = await evaluationRepository.findOne(id)
  return response.json({ evaluation })
}