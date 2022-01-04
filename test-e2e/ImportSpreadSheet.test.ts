import { axiosInstance } from './EndToEndConfig'
import { HttpStatusCode } from '../src/service/HttpError'

describe('Import Candidate', () => {
  const link = 'https://docs.google.com/spreadsheets/d/172hDo1RvIFpczFvuq3HoAD5wQoB2hBmnBHMoo_MYw8Y/edit#gid=199214593'

  // esse teste necessita das credenciais para funcionar:
  // GDRIVE_PRIVATE_KEY e GDRIVE_CLIENT_EMAIL
  it.skip('should access importspreadsheet API', async () => {

    const hiringProcess = await axiosInstance.post('/hiring_process', {
      name: '2022.1',
      description: 'description',
      startDate: '12/31/2021',
      endDate: '12/31/2022'
    }).then(res => res.data)

    const id = hiringProcess.data.id

    const response = await axiosInstance
      .post(`/candidate/hiring_process/${id}`, { link }).catch(res => console.log(res))
    expect(response.status).toEqual(HttpStatusCode.INTERNAL_SERVER)
  })

})
