import { getRepository } from "typeorm"
import { validate } from "class-validator"
import { HiringProcess } from "@models/entity/HiringProcess"
import { Message } from "../../messages/languages/pt-br"
import { hiringProcessRequest } from "@service/hiring-process/HiringProcessRequest"
import { hiringProcessService } from "@service/hiring-process/HiringProcessService"
import { httpResponseHandler } from "@controllers/HttpResponseHandler"

const getStatus = (startDate, endDate) => {
  const currentDate = Date.now()

  const statusPreparation = currentDate < startDate
  const statusOpened = currentDate >= startDate && currentDate <= endDate

  if (statusPreparation) {
    return "status-preparing"
  }
  if (statusOpened) {
    return "status-opened"
  }

  return "status-closed"
}

export const createHiringProcess = async (request, response) => {
  try {
    const hiringProcess = hiringProcessRequest().convertFromHttpBody(
      request.body
    )
    const result = await hiringProcessService().createHiringProcessService(
      hiringProcess
    )
    return httpResponseHandler().createSuccessResponse(
      Message.SUCCESS,
      result,
      response
    )
  } catch (error) {
    return httpResponseHandler().createErrorResponse(error, response)
  }
}

export const updateHiringProcess = async (request, response) => {
  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    const hiringProcess = await hiringProcessRepository.findOne(
      request.params.id
    )

    if (!hiringProcess) {
      return response.status(404).json({ message: Message.NOT_FOUND })
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
    await hiringProcessRepository.save(hiringProcess)
    return response.json({ message: Message.UPDATED, hiringProcess })
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const getAllHiringProcess = async (request, response) => {
  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    let hiringProcesses = await hiringProcessRepository.find({
      order: { startDate: "DESC" },
    })

    hiringProcesses = hiringProcesses.map((process) => ({
      ...process,
      status: getStatus(process.startDate, process.endDate),
    }))

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
      return response.status(410).json({ message: Message.NOT_REMOVED })
    }
    return response.json({ message: Message.REMOVED, result })
  } catch (error) {
    return response.status(500).json(error)
  }
}
