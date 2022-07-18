export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  CONFLICT = 409,
}

export class HttpError extends Error {
  public readonly msg: string
  public readonly status: HttpStatusCode

  constructor(msg: string, status: HttpStatusCode) {
    super(msg)
    this.msg = msg
    this.status = status
  }
}
