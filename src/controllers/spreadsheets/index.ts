import { GoogleSpreadsheet } from 'google-spreadsheet'
import { URL } from 'url'
import credential from '../../credential.json'

const link = new URL('https://docs.google.com/spreadsheets/d/1FxkDqFIfCAwvwrwmR-BMCuV_uO_YQv1H8U7QHA-FJk4/edit#gid=0')
const idLink = link.pathname.split('/')[3]

const connectSheet = async (idSheet) => {
  const docSheet = new GoogleSpreadsheet(idSheet)
  await docSheet.useServiceAccountAuth({ private_key: credential.private_key, client_email: credential.client_email })
  return docSheet
}

const loadDocument = async (idSheet) => {
  const connection = connectSheet(idSheet)
  await connection.loadInfo()
  return connection.title
}

connectSheet(idLink)
console.log(loadDocument(idLink))
