import { URL } from 'url'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import credential from './credential.json'

const connectSheet = async (id) => {
  // eslint-disable-next-line camelcase
  const { private_key, client_email } = credential
  const sheet = new GoogleSpreadsheet(id)
  await sheet.useServiceAccountAuth({
    private_key,
    client_email
  })
  return sheet
}

const getSheetId = link => {
  const url = new URL(link)
  return url.pathname.split('/')[3]
}

const getSpreadSheet = async (id, index) => {
  const connection = await connectSheet(id)
  await connection.loadInfo()
  return connection.sheetsByIndex[index]
}

export const importSpreadSheet = async ({ link }, mapping) => {
  // obtem o id da URL
  const sheetId = getSheetId(link)

  // retorna a tabela de candidatas
  const sheet = await (await getSpreadSheet(sheetId, 0)).getRows()

  // mapeamendo ta tabela do google para um array
  return mapping(sheet)
}
