import { httpStatusCode } from '../service/HttpError'

const { OK, INTERNAL_SERVER } = httpStatusCode

export const createSuccessResponse = (message, data, response) => {
  return response.status(OK).json({ message, data })
}

export const createErrorResponse = (error, response) => {
  const status = error?.status || INTERNAL_SERVER
  return response.status(status).json(error)
}
