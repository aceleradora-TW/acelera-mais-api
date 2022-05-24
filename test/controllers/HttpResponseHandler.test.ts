import { httpResponseHandler } from '../../src/controllers/HttpResponseHandler'
import { HttpError, HttpStatusCode } from '../../src/service/HttpError'

const mockResponse = (expectedStatusCode) => {
  return {
    status: jest.fn(function (code) {
      expect(code).toEqual(expectedStatusCode)
      const mockJson = (data) => {
        expect(data).toBeDefined()
      }
      return { json: mockJson }
    })
  }
}

describe('http response handler', () => {
  test('should create sucess OK response', () => {
    const handler = httpResponseHandler()
    handler.createSuccessResponse('msg', { data: 'teste' }, mockResponse(HttpStatusCode.OK))
  })

  test('should create INTERNAL_SERVER response if status not present', () => {
    const handler = httpResponseHandler()
    handler.createErrorResponse(new Error(), mockResponse(HttpStatusCode.INTERNAL_SERVER))
  })

  test('should create with HttpError status if present', () => {
    const handler = httpResponseHandler()
    handler.createErrorResponse(
      new HttpError('test', HttpStatusCode.BAD_REQUEST), mockResponse(HttpStatusCode.BAD_REQUEST))
  })

})
