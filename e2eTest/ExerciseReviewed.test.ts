import { axiosInstance } from './EndToEndConfig'
import { HttpStatusCode } from '../src/service/HttpError'

test('should access createExerciseReview API', async () => {
  const response = await axiosInstance.post('/exercise_reviewed', { feedback: 'teste feedback', score: 5, mentorEvaluation: 'teste mentor' })
  expect(response.status).toEqual(HttpStatusCode.OK)
})
