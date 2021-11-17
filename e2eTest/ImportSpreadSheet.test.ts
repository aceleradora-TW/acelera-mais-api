import { axiosInstance } from './EndToEndConfig'
import { HttpStatusCode } from '../src/service/HttpError'

test('should access importspreadsheet API', async () => {
  const response = await axiosInstance.post('/importspreadsheet', {})
  expect(response.status).toEqual(HttpStatusCode.OK)
})
