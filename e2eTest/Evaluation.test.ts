import { axiosInstance } from './EndToEndConfig'
import { HttpStatusCode } from '../src/service/HttpError'

test('should edit evaluation', async () => {
  const response = await axiosInstance.post('/exercise', {
    mentorName: 'teste mentor',
    feedback: 'teste feedback',
    score: 5
  })
  expect(response.status).toEqual(HttpStatusCode.OK)
})
