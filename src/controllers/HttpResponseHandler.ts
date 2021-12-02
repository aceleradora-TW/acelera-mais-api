import { HttpError, HttpStatusCode } from '../service/HttpError'

export class HttpResponseHandler {
  public createSuccessResponse (message: string, data, response) {
    const status = HttpStatusCode.OK
    response.status(status).json({ message, data })
    return response
  }

  public createErrorResponse (error, response) {
    let status = HttpStatusCode.INTERNAL_SERVER
    if (error instanceof HttpError) {
      status = error.status
    }
    response.status(status).json(error)
    console.log(error)
    return response
  }
}
