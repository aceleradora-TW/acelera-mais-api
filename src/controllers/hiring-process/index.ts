import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { HiringProcess } from '@models/entity/HiringProcess'
import { message } from '../../messages/languages/pt-br'

export const createProcess = async (request, response) => {
  const { name, startDate, endDate, description } = request.body

  const hiringProcessData = {
    name,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    description
  }

  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    const hiringProcess = hiringProcessRepository.create(hiringProcessData)
    const errors = await validate(hiringProcess)
    if (errors.length > 0) {
      return response.status(400).json(errors)
    }
    const result = await hiringProcessRepository.save(hiringProcess)
    return response.json({ message: message.SUCCESS, result })
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const editHiringProcess = async (request, response) => {
  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    const hiringProcess = new HiringProcess()

    hiringProcess.name = request.body.name
    hiringProcess.startDate = new Date(request.body.startDate)
    hiringProcess.endDate = new Date(request.body.endDate)
    hiringProcess.description = request.body.description

    await hiringProcessRepository.update(request.params.id, hiringProcess)
    const updatedHiringProcess = await hiringProcessRepository.findOne(request.params.id)
    return response.json({ message: message.UPDATED, updatedHiringProcess })
  } catch (error) {
    return response.status(500).json(error)
  }
}
