import { axiosInstance } from './EndToEndConfig'
import { HttpStatusCode } from '../src/service/HttpError'

test('should access createChallengReview API', async () => {
  const response = await axiosInstance.post('/challenge', {
    mentorName: 'teste mentor',
    feedback: 'teste feedback',
    score: 5
  })
  expect(response.status).toEqual(HttpStatusCode.OK)
})
