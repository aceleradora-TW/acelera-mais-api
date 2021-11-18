import { message } from '../../messages/languages/pt-br'
import { HttpResponseHandler } from '@controllers/HttpResponseHandler'
import { importCandidatesFromSpreadsheet } from 'src/service/spreadsheet/SpreadsheetCandidatesService'

const httpResponseHandler = new HttpResponseHandler()

export const importSpreadsheet = async (request, response) => {
  const { urlSheet } = request.body

  const results = await importCandidatesFromSpreadsheet(urlSheet)
  return httpResponseHandler.createSuccessResponse(message.SUCCESS, { message: results.length + ' records created' }, response)
}
