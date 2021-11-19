export const httpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500
}

export const httpError = (message, status) => {
  const error = new Error(message)
  return {
    error,
    status
  }
}

export const createSuccessResponse = (message, data, response) => {
  return response.status(httpStatusCode.OK).json({ message, data })
}

export const createErrorResponse = (error, response) => {
  const status = error?.status || httpStatusCode.INTERNAL_SERVER
  return response.status(status).json(error)
}
