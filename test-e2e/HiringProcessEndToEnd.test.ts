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
  expect(hiringProcessResponse.data.description).toEqual('')
  expect(hiringProcessResponse.data.createdAt).toBeDefined()
  expect(hiringProcessResponse.data.updatedAt).toBeDefined()
}

test('should test create, get and delete HiringProcess', async () => {
  // CREATE
  const response = await axiosInstance.post('/hiring_process', {
    name: 'Test',
    startDate: '03/15/2021',
    endDate: '03/25/2021',
    description: undefined
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



test('should test edit HiringProcess', async () => {
  const responseCreate = await axiosInstance.post('/hiring_process', {
    name: 'Test',
    startDate: '03/15/2021',
    endDate: '03/25/2021',
    description: 'descricao'
  })
  expect(responseCreate.status).toEqual(HttpStatusCode.OK)
  const hiringProcessId = responseCreate.data.data.id; 
  const responseEdit = await axiosInstance.patch(`/hiring_process/${hiringProcessId}`, {
    name: 'Test novo',
    startDate: '04/15/2021',
    endDate: '05/25/2021',
    description: 'descricao nova'
  })
  expect(responseEdit.status).toEqual(HttpStatusCode.OK)
})