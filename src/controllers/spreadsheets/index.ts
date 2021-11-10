import { message } from '@messages/languages/pt-br'
import { Spreadsheet } from '@models/entity/Spreadsheet'
import { validate } from 'class-validator'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { getRepository } from 'typeorm'
import { URL } from 'url'
import credential from '../../credential.json'

export const connection = async (request, response) => {
  const { urlSheet } = request.body

  const link = new URL(urlSheet)
  const idLink = link.pathname.split('/')[3]
  const sheetConnection = await connectSheet(idLink)
  await sheetConnection.loadInfo()
  // return response.json({ titulo: sheetConnection.title })

  try {
    const spreadsheetRepository = getRepository(Spreadsheet)
    const spreadsheet = spreadsheetRepository.create({name: })
    const errors = await validate(spreadsheet)
    if (errors) {
      return response.status(404).json({ errors: message.NOT_FOUND })
    }
    spreadsheet.idLink = idLink
    // const result = await hiringProcessRepository.save(hiringProcess)
    return response.json({ message: message.SUCCESS })
  } catch (error) {
    return response.status(500).json(error)
  }
}

const connectSheet = async (idSheet) => {
  const docSheet = new GoogleSpreadsheet(idSheet)
  await docSheet.useServiceAccountAuth({ private_key: credential.private_key, client_email: credential.client_email })
  return docSheet
}
