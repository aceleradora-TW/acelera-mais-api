import { HiringProcessRequest } from '../../../src/service/hiring-process/HiringProcessRequest'

test('should convert to request given valid parameters', async () => {
  const body = {
    name: 'Test',
    startDate: '03/15/2021',
    endDate: '03/25/2021',
    description: ''
  }
  const hiringProcessRequest = HiringProcessRequest.convertFromHttpBody(body)
  expect(hiringProcessRequest.name).toEqual(body.name)
  expect(hiringProcessRequest.startDate).toEqual(new Date(body.startDate))
  expect(hiringProcessRequest.endDate).toEqual(new Date(body.endDate))
  expect(hiringProcessRequest.description).toEqual(body.description)
})

test('should convert to undefined dates when not present', async () => {
  const body = {
    name: 'Test',
    startDate: undefined,
    endDate: undefined,
    description: ''
  }
  const hiringProcessRequest = HiringProcessRequest.convertFromHttpBody(body)
  expect(hiringProcessRequest.startDate).toEqual(undefined)
  expect(hiringProcessRequest.endDate).toEqual(undefined)
})
