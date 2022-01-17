
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { HiringProcess } from '@models/entity/HiringProcess'
import { HttpError, HttpStatusCode } from '../HttpError'

export const hiringProcessService = () => {
  const createHiringProcessService = async (hiringProcessRequest: any) => {
    const hiringProcessRepository = getRepository(HiringProcess)
    const hiringProcessEntity = await hiringProcessRepository.create(hiringProcessRequest)
    validateHiringProcess(hiringProcessEntity)
    const hiringProcessEntitySaved = await hiringProcessRepository.save(hiringProcessEntity)
    return hiringProcessEntitySaved
  }

  const validateHiringProcess = async (hiringProcess) => {
    const errors = await validate(hiringProcess)
    if (errors.length > 0) {
      throw new HttpError('Errors validating the hiring process:' + errors, HttpStatusCode.BAD_REQUEST)
    }
  }
  return { createHiringProcessService, validateHiringProcess }
}
