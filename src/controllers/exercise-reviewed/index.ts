import { message } from '../../messages/languages/pt-br'
import { HttpResponseHandler } from '@controllers/HttpResponseHandler'

const httpResponseHandler = new HttpResponseHandler()

export const createExerciseReview = async (request, response) => {
  try {
    const feedback = request.body.feedback
    console.log(feedback)
    return httpResponseHandler.createSuccessResponse(message.SUCCESS, { message: 'funcionou' }, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}
