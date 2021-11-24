/* eslint-disable camelcase */
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { URL } from 'url'
import credential from './credential.json'

const getSheetId = (link, next) => {
  let url = undefined
  try {
    url = new URL(link).pathname.split('/')[3]
    if (url == undefined) {
      throw url;
    }
  } catch {
    next(new Error('link da planilha não valido'))
  }
  return url
}

const timeoutConnect = (next) => {
  return setTimeout(() => next(new Error('Conexão com planilha falhou')), 20000);
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

export const importSpreadSheet = async (link, mappingCallback, next) => {
  const id = getSheetId(link, next)
  const timeout = timeoutConnect(next)
  const rows = await getGoogleSheetRows(id)
  clearTimeout(timeout)
  return mappingCallback(rows)
}

