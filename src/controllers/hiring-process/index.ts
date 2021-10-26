import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { HiringProcess } from '@models/entity/HiringProcess'
import { message } from '../../messages/languages/pt-br'

export const createHiringProcess = async (request, response) => {
  const { name, startDate, endDate, description } = request.body

  const hiringProcessData = {
    id: request.body.id,
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

export const getAllHiringProcesses = async (request, response) => {
  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    const result = await hiringProcessRepository.find({})
    return response.status(200).json(result)
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const delAllHiringProcesses = async (request, response) => {
  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    const result = await hiringProcessRepository.findOne({ select: ['id'] })
    return response.json({ message: 'Processo Removido com sucesso', result })
  } catch (error) {
    return response.status(500).json(error)
  }
}
