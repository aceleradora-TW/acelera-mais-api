import { axiosInstance } from './EndToEndConfig'
import { HttpStatusCode } from '../src/service/HttpError'

test('should access importspreadsheet API', async () => {
  const response = await axiosInstance.post('/candidates', { urlSheet: 'https://docs.google.com/spreadsheets/d/172hDo1RvIFpczFvuq3HoAD5wQoB2hBmnBHMoo_MYw8Y/edit#gid=199214593' })
  expect(response.status).toEqual(HttpStatusCode.OK)
})
