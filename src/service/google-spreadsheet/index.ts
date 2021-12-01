/* eslint-disable camelcase */
import { request } from 'express'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { URL } from 'url'
import { HttpError, HttpStatusCode } from '../HttpError'
require('dotenv').config()
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
    if (!(process.env.GDRIVE_PRIVATE_KEY && process.env.GDRIVE_CLIENT_EMAIL)) {
      throw new HttpError("variavel de ambiente GDRIVE_PRIVATE_KEY ou GDRIVE_CLIENT_EMAIL nao foi definida",
        HttpStatusCode.INTERNAL_SERVER)
    }
    const private_key = process.env.GDRIVE_PRIVATE_KEY.replace(/\\n/g, '\n')
    const client_email = process.env.GDRIVE_CLIENT_EMAIL
    console.log(private_key)
    console.log(client_email)
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

