import { message } from '../../messages/languages/pt-br'
import { HttpResponseHandler } from '@controllers/HttpResponseHandler'
import { EvaluationRequest } from '../../service/exercise/EvaluationRequest'
import { EvaluationService } from '../../service/exercise/EvaluationService'

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
    const evaluationUpdated = await evaluationService.editEvaluation(
      request.body.id,
      request.body.mentorName,
      request.body.score,
      request.body.feedback)
    return httpResponseHandler.createSuccessResponse(message.UPDATED, evaluationUpdated, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}
