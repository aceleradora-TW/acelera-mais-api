
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { HiringProcess } from '@models/entity/HiringProcess'
import { HttpError, HttpStatusCode } from '../HttpError'

export const createHiringProcessService = async (hiringProcessRequest: any) => {
  const hiringProcessRepository = getRepository(HiringProcess)
  const hiringProcessEntity = await hiringProcessRepository.create(hiringProcessRequest)
  await validateHiringProcess(hiringProcessEntity)
  const hiringProcessEntitySaved = await hiringProcessRepository.save(hiringProcessEntity)
  return hiringProcessEntitySaved
}

async function validateHiringProcess (hiringProcess) {
  const errors = await validate(hiringProcess)
  if (errors.length > 0) {
    throw new HttpError('Errors validating the hiring process:' + errors, HttpStatusCode.BAD_REQUEST)
  }
}
