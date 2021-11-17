import { message } from '../../messages/languages/pt-br'
import { HttpResponseHandler } from '@controllers/HttpResponseHandler'
import { ExerciseReviewedRequest } from '../../service/exercise-reviewed/ExerciseReviewedRequest'
import { ExerciseReviewedService } from '../../service/exercise-reviewed/ExerciseReviewedService'

const reviewService = new ExerciseReviewedService()
const httpResponseHandler = new HttpResponseHandler()

export const createExerciseReview = async (request, response) => {
  try {
    const exerciseReviewedRequest = ExerciseReviewedRequest.convertFromHttpBody(request.body)
    const result = await reviewService.createExerciseReviewedService(exerciseReviewedRequest)
    return httpResponseHandler.createSuccessResponse(message.SUCCESS, result, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}
