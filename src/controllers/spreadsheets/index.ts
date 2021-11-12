import { Spreadsheet } from '@models/entity/Spreadsheet'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { getRepository } from 'typeorm'
import { URL } from 'url'
import credential from '../../credential.json'

const connectSheet = async (idSheet) => {
  const docSheet = new GoogleSpreadsheet(idSheet)
  await docSheet.useServiceAccountAuth({ private_key: credential.private_key, client_email: credential.client_email })
  return docSheet
}

export const connection = async (request, response) => {
  console.log(request.body)
  const { urlSheet, hiringProcessID } = request.body
  try {
    const link = new URL(urlSheet)
    const idLink = link.pathname.split('/')[3]
    const sheetConnection = await connectSheet(idLink)
    await sheetConnection.loadInfo()
    const sheetFirst = sheetConnection.sheetsByIndex[0]
    const spreadsheets = (await sheetFirst.getRows()).map((row) => {
      return {
        timeStamp: row._rawData[1],
        adressEmail: row._rawData[2],
        name: row._rawData[3],
        email: row._rawData[4],
        phone: row._rawData[5],
        birthDate: row._rawData[6],
        genre: row._rawData[7],
        skinColor: row._rawData[8],
        instituitionName: row._rawData[9],
        courseName: row._rawData[10],
        milestone: row._rawData[11],
        howFound: row._rawData[12],
        expectation: row._rawData[13],
        motivation: row._rawData[14],
        curriculum: row._rawData[15],
        okCI: row._rawData[16],
        hiringProcessID
      }
    })

    const spreadsheetRepository = getRepository(Spreadsheet)
    const spreadsheet = spreadsheetRepository.create(spreadsheets)

    return response.json(spreadsheet)
  } catch (error) {
    return response.status(500).json(error)
  }
}
