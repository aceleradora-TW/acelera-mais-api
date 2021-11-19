import { message } from '../../messages/languages/pt-br'
import { createSuccessResponse } from '@controllers/HttpResponseHandler'

export const importSpreadSheet = async (request, response) => {
  return createSuccessResponse(message.SUCCESS, { message: 'NO IMPLEMENTED' }, response)
}
