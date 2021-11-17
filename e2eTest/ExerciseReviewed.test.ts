import { axiosInstance } from './EndToEndConfig'
import { HttpStatusCode } from '../src/service/HttpError'

test('should access createExerciseReview API', async () => {
  const response = await axiosInstance.post('/exercise_reviewed', {
    name: 'teste mentor',
    feedback: 'teste feedback',
    score: 5
  })
  expect(response.status).toEqual(HttpStatusCode.OK)
})
