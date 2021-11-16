import { HttpError, HttpStatusCode } from '../../src/service/HttpError'

test('Should construct HttpError class', () => {
  const error = new HttpError('my msg', HttpStatusCode.BAD_REQUEST)
  expect(error.status).toEqual(HttpStatusCode.BAD_REQUEST)
  expect(error.message).toEqual('my msg')
})
