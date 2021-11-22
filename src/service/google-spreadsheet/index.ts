/* eslint-disable camelcase */
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { URL } from 'url'
import credential from './credential.json'

const getSheetId = (link) => {
  const url = new URL(link)
  return url.pathname.split('/')[3]
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
  const rows = await getGoogleSheetRows(id)
  return mappingCallback(rows)
}
