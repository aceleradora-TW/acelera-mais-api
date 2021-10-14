import { getRepository } from 'typeorm'
import { HiringProcess } from '@models/entity/HiringProcess'
import { validate } from 'class-validator'
import { message } from 'src/messages/pt-br'

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
