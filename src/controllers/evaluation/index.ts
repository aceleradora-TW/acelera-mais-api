import { getRepository } from "typeorm"
import { evaluationRequest } from '@service/evaluation/EvaluationRequest'
import { EvaluationService } from '@service/evaluation/EvaluationService'
import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "@messages/languages/pt-br"
import { Evaluation } from "@models/entity/Evaluation"

const httpResponse = httpResponseHandler()
const evaluationService = new EvaluationService()
const evaluation = evaluationRequest()

export const getAllEvaluation = async (request, response) => {
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

export const createEvaluation = async (request, response) => {
  try {
    const evaluationRequest = evaluation.convertFromHttpBody(request.body)
    const result = await evaluationService.createEvaluationService(evaluationRequest)
    return httpResponse.createSuccessResponse(message.SUCCESS, result, response)
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}

export const updateEvaluation = async (request, response) => {
  try {
    const { mentorName, score, feedback } = request.body
    const { id } = request.params
    const evaluationUpdated = await evaluationService.editEvaluation(
      id,
      mentorName,
      score,
      feedback)
    return httpResponse.createSuccessResponse(message.UPDATED, evaluationUpdated, response)
  } catch (error) {
    console.log(error)
    return httpResponse.createErrorResponse(error, response)
  }
}

export const deleteEvaluation = async (request, response) => {
  try {
    const result = await evaluationService.deleteEvaluation(request.params.id)
    return httpResponse.createSuccessResponse(message.REMOVED, result, response)
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}