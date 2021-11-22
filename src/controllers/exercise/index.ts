import { message } from '../../messages/languages/pt-br'
import { HttpResponseHandler } from '@controllers/HttpResponseHandler'
import { EvaluationRequest } from '../../service/exercise/EvaluationRequest'
import { EvaluationService } from '../../service/exercise/EvaluationService'
import { Evaluation } from '@models/entity/Evaluation'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

const evaluationService = new EvaluationService()
const httpResponseHandler = new HttpResponseHandler()

export const createEvaluation = async (request, response) => {
  try {
    const evaluationRequest = EvaluationRequest.convertFromHttpBody(request.body)
    const result = await evaluationService.createEvaluationService(evaluationRequest)
    return httpResponseHandler.createSuccessResponse(message.SUCCESS, result, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}

export const editEvaluation = async (request, response) => {
  try {
    const evaluationRepository = getRepository(Evaluation)
    const evaluation = await evaluationRepository.findOne(request.params.id)

    if (!evaluation) {
      return response.status(404).json({ message: message.NOT_FOUND })
    }

    if (request.body.mentorName) {
      evaluation.mentorName = request.body.name
    }

    if (request.body.score) {
      evaluation.score = request.body.score
    }

    if (request.body.feedback) {
      evaluation.feedback = request.body.feedback
    }

    const errors = await validate(evaluation)
    if (errors.length > 0) {
      return response.status(400).json(errors)
    }
    await evaluationRepository.update(request.params.id, evaluation)
    return response.json({ message: message.UPDATED, evaluation })
  } catch (error) {
    return response.status(500).json(error)
  }
}
