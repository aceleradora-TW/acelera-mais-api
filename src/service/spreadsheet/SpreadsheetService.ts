
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { HttpError, HttpStatusCode } from '../HttpError'
import { Spreadsheet } from '@models/entity/Spreadsheet'

export class SpreadsheetService {
  public async spreadsheetSaveRecords (SpreadsheetEntityModel: any[]) {
    const spreadsheetRepository = getRepository(Spreadsheet)
    const spreadsheetsEntity = spreadsheetRepository.create(SpreadsheetEntityModel)
    await this.validateSpreadsheet(spreadsheetsEntity)
    const spreadsheetsEntitySaved = await spreadsheetRepository.save(spreadsheetsEntity)
    return spreadsheetsEntitySaved
  }

  private async validateSpreadsheet (spreadsheets) {
    spreadsheets.array.forEach(async spreadsheet => {
      const errors = await validate(spreadsheet)
      if (errors.length > 0) {
        throw new HttpError('Errors validating the spreadsheet:' + errors, HttpStatusCode.BAD_REQUEST)
      }
    })
  }
}
