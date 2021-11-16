import { message } from '../../messages/languages/pt-br'
import { HttpResponseHandler } from '@controllers/HttpResponseHandler'

const httpResponseHandler = new HttpResponseHandler()

export const importSpreadSheet = async (request, response) => {
  return httpResponseHandler.createSuccessResponse(message.SUCCESS, { message: 'NO IMPLEMENTED' }, response)
}
