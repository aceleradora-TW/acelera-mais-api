import { HttpStatusCode } from '../src/service/HttpError'
// @ts-ignore
import { axiosInstance } from './EndToEndConfig'

function assertFields (hiringProcessResponse) {
  expect(hiringProcessResponse.message).toEqual('Salvo com sucesso!')
  expect(hiringProcessResponse.data.id).toBeDefined()
  expect(hiringProcessResponse.data.name).toBeDefined()
  expect(hiringProcessResponse.data.startDate).toBeDefined()
  expect(hiringProcessResponse.data.endDate).toBeDefined()
  expect(hiringProcessResponse.data.description).toBeDefined()
  expect(hiringProcessResponse.data.createdAt).toBeDefined()
  expect(hiringProcessResponse.data.updatedAt).toBeDefined()
}

test('should test create, get and delete HiringProcess', async () => {
  // CREATE
  const response = await axiosInstance.post('/hiring_process', {
    name: 'Test',
    startDate: '03/15/2021',
    endDate: '03/25/2021',
    description: 'Teste de descrição'
  })
  const hiringProcessResponse = response.data
  expect(response.status).toEqual(HttpStatusCode.OK)
  assertFields(hiringProcessResponse)

  // GET
  const responseGet = await axiosInstance.get('/hiring_process')
  expect(responseGet.status).toEqual(HttpStatusCode.OK)

  // DELETE
  const id = hiringProcessResponse.data.id
  const responseDelete = await axiosInstance.delete(`/hiring_process/${id}`)
  expect(responseDelete.status).toEqual(HttpStatusCode.OK)
})
