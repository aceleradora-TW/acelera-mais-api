
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { HiringProcess } from '@models/entity/HiringProcess'
import { httpError, httpStatusCode } from '../HttpError'

// export class HiringProcessService {
//   public async createHiringProcessService (hiringProcessRequest: any) {
//     const hiringProcessRepository = getRepository(HiringProcess)
//     const hiringProcessEntity = await hiringProcessRepository.create(hiringProcessRequest)
//     await this.validateHiringProcess(hiringProcessEntity)
//     const hiringProcessEntitySaved = await hiringProcessRepository.save(hiringProcessEntity)
//     return hiringProcessEntitySaved
//   }

//   private async validateHiringProcess (hiringProcess) {
//     const errors = await validate(hiringProcess)
//     if (errors.length > 0) {
//       throw new HttpError('Errors validating the hiring process:' + errors, HttpStatusCode.BAD_REQUEST)
//     }
//   }
// }

const validateHiringProcess = async (hiringProcess) => {
  const errors = await validate(hiringProcess)
  if (errors.length > 0) {
    throw httpError(`Errors validating the hiring process: ${errors}`, httpStatusCode.BAD_REQUEST).error
  }
}

const hiringProcessRequest = ({ body }) => {
  const { name, startDate, endDate, description = '' } = body
  return {
    name,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
    description
  }
}

export const createHiringProcessService = async ({ body }) => {
  const hiringProcess = hiringProcessRequest(body)
  const hiringProcessRepository = getRepository(HiringProcess)
  const hiringProcessEntity = await hiringProcessRepository.create(hiringProcess)
  await validateHiringProcess(hiringProcessEntity)
  return await hiringProcessRepository.save(hiringProcessEntity)
}
