import { axiosInstance } from './EndToEndConfig'
import { HttpStatusCode } from '../src/service/HttpError'

describe('Evaluation', () => {

  it('should create evaluation', async () => {
    const response = await axiosInstance.post('/challenge', {
      mentorName: 'teste mentor',
      feedback: 'teste feedback',
      score: 5
    })

    expect(response.status).toEqual(HttpStatusCode.OK)
  })

  it('should edit evaluation', async () => {

    const response = await axiosInstance.post('/challenge', {
      mentorName: 'teste mentor',
      feedback: 'teste feedback',
      score: 5
    }).then(res => res.data)

    const id = response.data.id

    const evaluationUpdated = await axiosInstance.patch(`/challenge/${id}`, {
      mentorName: 'novo mentor',
      feedback: 'novo feedback',
      score: 4
    })

    expect(evaluationUpdated.status).toEqual(HttpStatusCode.OK)
    expect(evaluationUpdated.data.data.mentorName).toEqual('novo mentor')
    expect(evaluationUpdated.data.data.feedback).toEqual('novo feedback')
    expect(evaluationUpdated.data.data.score).toEqual(4)

  })
})

