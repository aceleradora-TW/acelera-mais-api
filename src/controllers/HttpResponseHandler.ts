import { HttpError, HttpStatusCode } from '../service/HttpError'

export const httpResponseHandler = () => {

  const createSuccessResponse = (message: string, data, response) => {
    const status = HttpStatusCode.OK
    response.status(status).json({ message, data })
    return response
  }

  const createErrorResponse = (error, response) => {
    let status = HttpStatusCode.INTERNAL_SERVER
    if (error instanceof HttpError) {
      status = error.status
    }
    response.status(status).json(error)
    return response
  }

  return { createSuccessResponse, createErrorResponse }
}
