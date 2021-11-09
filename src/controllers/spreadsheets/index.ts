import { GoogleSpreadsheet } from 'google-spreadsheet'
import { URL } from 'url'
import credential from '../../credential.json'

export const testeConexao = async (request, response) => {
  const { urlSheet } = request.body

  const link = new URL(urlSheet)
  const idLink = link.pathname.split('/')[3]
  const sheetConnection = await connectSheet(idLink)
  await sheetConnection.loadInfo()
  return response.json({ titulo: sheetConnection.title })
}

const connectSheet = async (idSheet) => {
  const docSheet = new GoogleSpreadsheet(idSheet)
  await docSheet.useServiceAccountAuth({ private_key: credential.private_key, client_email: credential.client_email })
  return docSheet
}

// const loadDocument = async (idSheet) => {
//     const connection = await connectSheet(idSheet)
//     await connection.loadInfo()
//     return connection.title
// }

// console.log(loadDocument(idLink))
