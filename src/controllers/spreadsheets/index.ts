import { GoogleSpreadsheet } from 'google-spreadsheet'
import { URL } from 'url'
import credential from '../../credential.json'

const connectSheet = async (idSheet) => {
  const docSheet = new GoogleSpreadsheet(idSheet)
  await docSheet.useServiceAccountAuth({ private_key: credential.private_key, client_email: credential.client_email })
  return docSheet
}

export const connection = async (request, response) => {
  console.log(request.body)
  const { urlSheet } = request.body
  try {
    const link = new URL(urlSheet)
    const idLink = link.pathname.split('/')[3]
    const sheetConnection = await connectSheet(idLink)
    await sheetConnection.loadInfo()
    const sheetFirst = sheetConnection.sheetsByIndex[0]
    const spreadsheets = (await sheetFirst.getRows()).map((row) => {
      return {
        id: row._rawData[0],
        TimeStamp: row._rawData[1],
        adressEmail: row._rawData[2],
        name: row._rawData[3],
        email: row._rawData[4],
        phone: row._rawData[5],
        birthDate: row._rawData[6],
        instituitionName: row._rawData[7],
        courseName: row._rawData[8],
        milestone: row._rawData[9],
        howFound: row._rawData[10],
        expectation: row._rawData[11],
        motivation: row._rawData[12],
        curriculum: row._rawData[13],
        okCI: row._rawData[14]

      }
    })

    // Spreadsheet

    return response.json(spreadsheets)
  } catch (error) {
    return response.status(500).json(error)
  }
}
