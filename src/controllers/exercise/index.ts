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
    const exercise = await evaluationRepository.findOne(request.params.id)

    if (!exercise) {
      return response.status(404).json({ message: message.NOT_FOUND })
    }

    if (request.body.name) {
      exercise.mentorName = request.body.name
    }

    if (request.body.score) {
      exercise.score = request.body.score
    }

    if (request.body.feedBack) {
      exercise.feedback = request.body.feedBack
    }

    const errors = await validate(exercise)
    if (errors.length > 0) {
      return response.status(400).json(errors)
    }
    await evaluationRepository.update(request.params.id, exercise)
    // eslint-disable-next-line indent
    return response.json({ message: message.UPDATED, exercise })
  } catch (error) {
    return response.status(500).json(error)
  }
}
