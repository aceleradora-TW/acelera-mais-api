import { GoogleSpreadsheet } from 'google-spreadsheet'
import { URL } from 'url'
import credential from '../../credential.json'
import { HttpError, HttpStatusCode } from '../HttpError'
import { SpreadsheetEntityModel } from './SpreadsheetMapEntity'
import { SpreadsheetService } from './SpreadsheetService'

const spreadsheetService = new SpreadsheetService()

export const importCandidatesFromSpreadsheet = async (urlSheet) => {
  try {
    const link = new URL(urlSheet)
    const idLink = link.pathname.split('/')[3]
    const sheetConnection = await connectSheet(idLink)
    await sheetConnection.loadInfo()
    const sheetFirst = sheetConnection.sheetsByIndex[0]
    const spreadsheets = (await sheetFirst.getRows()).map((row) => {
      return SpreadsheetEntityModel.spreadsheetFactory(row._rawData)
    })
    console.log(spreadsheetService)
    console.log(spreadsheets)
    console.log('teste')
    return spreadsheets
    // return spreadsheetService.spreadsheetSaveRecords(spreadsheets)
  } catch (error) {
    throw new HttpError('Errors Request of spreadsheet:' + error, HttpStatusCode.BAD_REQUEST)
  }
}

async function connectSheet (idLink: string) {
  const docSheet = new GoogleSpreadsheet(idLink)
  await docSheet.useServiceAccountAuth({ private_key: credential.private_key, client_email: credential.client_email })
  return docSheet
}
