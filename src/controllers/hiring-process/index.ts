import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { HiringProcess } from '@models/entity/HiringProcess'
import { message } from '../../messages/languages/pt-br'
import { HiringProcessRequest } from '../../service/hiring-process/HiringProcessRequest'
import { HiringProcessService } from '../../service/hiring-process/HiringProcessService'
import { HttpResponseHandler } from '@controllers/HttpResponseHandler'

const hiringService = new HiringProcessService()
const httpResponseHandler = new HttpResponseHandler()

const getStatus = (startDate, endDate) => {
  const currentDate = Date.now()

  const statusPreparation = currentDate < startDate
  const statusOpened = currentDate >= startDate && currentDate <= endDate

  if (statusPreparation) {
    return 'status-preparing'
  }
  if (statusOpened) {
    return 'status-opened'
  }

  return 'status-closed'
}

export const createHiringProcess = async (request, response) => {
  try {
    const hiringProcessRequest = HiringProcessRequest.convertFromHttpBody(request.body)
    const result = await hiringService.createHiringProcessService(hiringProcessRequest)
    return httpResponseHandler.createSuccessResponse(message.SUCCESS, result, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}

export const updateHiringProcess = async (request, response) => {
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

export const getAllHiringProcess = async (request, response) => {
  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    let hiringProcesses = await hiringProcessRepository.find({})

    hiringProcesses = hiringProcesses.map(process => ({ ...process, status: getStatus(process.startDate, process.endDate) }))

    return response.status(200).json(hiringProcesses)
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const deleteHiringProcess = async (request, response) => {
  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    const result = await hiringProcessRepository.delete(request.params.id)
    if (result.affected === 0) {
      return response.status(410).json({ message: message.NOT_REMOVED })
    }
    return response.json({ message: message.REMOVED, result })
  } catch (error) {
    return response.status(500).json(error)
  }
}
