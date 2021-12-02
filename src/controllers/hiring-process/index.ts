import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { HiringProcess } from '@models/entity/HiringProcess'
import { message } from '../../messages/languages/pt-br'
import { HiringProcessRequest } from '../../service/hiring-process/HiringProcessRequest'
import { HiringProcessService } from '../../service/hiring-process/HiringProcessService'
import { HttpResponseHandler } from '@controllers/HttpResponseHandler'
import { HttpError, HttpStatusCode } from '../../service/HttpError'

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

export const createHiringProcessEndpoint = async (request, response) => {
  try {
    const hiringProcessRequest = HiringProcessRequest.convertFromHttpBody(request.body)
    const result = await hiringService.createHiringProcessService(hiringProcessRequest)
    return httpResponseHandler.createSuccessResponse(message.SUCCESS, result, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}

export const editHiringProcess = async (request, response) => {
  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    console.log("ID: " + request.params.id)
    const hiringProcess = await hiringProcessRepository.findOne(request.params.id)
    console.log("hiringProcess request: " + JSON.stringify(hiringProcess))
    if (!hiringProcess) {
      throw new HttpError(message.NOT_FOUND, HttpStatusCode.BAD_REQUEST)
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
      throw new HttpError("Erro validando edit hiring process", HttpStatusCode.BAD_REQUEST)
    }
    await hiringProcessRepository.update(request.params.id, hiringProcess)
    const hiringProcessUpdated = await hiringProcessRepository.findOne(request.params.id)
    console.log("hiringProcessUpdated: " + JSON.stringify(hiringProcessUpdated))
    return response.json({ message: message.UPDATED, hiringProcess })
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}

export const getAllHiringProcesses = async (request, response) => {
  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    let hiringProcesses = await hiringProcessRepository.find({ order: { startDate: 'DESC' } })

    hiringProcesses = hiringProcesses.map(process => ({ ...process, status: getStatus(process.startDate, process.endDate) }))

    return response.status(200).json(hiringProcesses)
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const delAllHiringProcesses = async (request, response) => {
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
