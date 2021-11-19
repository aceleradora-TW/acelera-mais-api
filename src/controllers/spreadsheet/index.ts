import { message } from '../../messages/languages/pt-br'
import { createSuccessResponse } from '@service/HttpHandler'

export const importSpreadSheet = async (request, response) => {
  return createSuccessResponse(message.SUCCESS, { message: 'NO IMPLEMENTED' }, response)
}
