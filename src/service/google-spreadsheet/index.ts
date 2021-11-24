/* eslint-disable camelcase */
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { URL } from 'url'
import { HttpError, HttpStatusCode } from '../HttpError'
import credential from './credential.json'

const getSheetId = (link) => {
  let url = undefined
  try {
    url = new URL(link).pathname.split('/')[3]
    if (url == undefined) {
      throw url;
    }
  } catch (errors) {
    throw new HttpError('Link da planilha não é valido.:' + errors, HttpStatusCode.BAD_REQUEST)
  }
  return url
}

const timeoutConnect = () => {
  return setTimeout(() => new HttpError('Timeout ao carregar a planilha.:', HttpStatusCode.INTERNAL_SERVER), 40000);
}

const getGoogleSheetRows = async (id) => {
  const { private_key, client_email } = credential
  const sheet = new GoogleSpreadsheet(id)
  await sheet.useServiceAccountAuth({
    private_key,
    client_email
  })
  await sheet.loadInfo()
  return await sheet.sheetsByIndex[0].getRows()
}

export const importSpreadSheet = async (link, mappingCallback) => {
  const id = getSheetId(link)
  const timeout = timeoutConnect()
  const rows = await getGoogleSheetRows(id)
  clearTimeout(timeout)
  return mappingCallback(rows)
}

