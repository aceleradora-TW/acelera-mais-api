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
    const hiringProcess = await hiringProcessRepository.findOne(request.params.id)

    if (!hiringProcess) {
      return response.status(404).json({ message: message.NOT_FOUND })
    }

    if (request.body.name) {
      hiringProcess.name = request.body.name
    }

    if (request.body.startDate) {
      hiringProcess.startDate = new Date(request.body.startDate)
    }

    if (request.body.endDate) {
      hiringProcess.endDate = new Date(request.body.endDate)
    }

    if (request.body.description) {
      hiringProcess.description = request.body.description
    }

    const errors = await validate(hiringProcess)
    if (errors.length > 0) {
      return response.status(400).json(errors)
    }
    await hiringProcessRepository.update(request.params.id, hiringProcess)
    return response.json({ message: message.UPDATED, hiringProcess })
  } catch (error) {
    return response.status(500).json(error)
  }
}
