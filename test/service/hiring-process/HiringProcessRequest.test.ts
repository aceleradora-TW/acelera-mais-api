import { hiringProcessRequest } from '../../../src/service/hiring-process/HiringProcessRequest'

test('should convert to request given valid parameters', async () => {
  const body = {
    name: 'Test',
    startDate: '03/15/2021',
    endDate: '03/25/2021',
    description: ''
  }
  const HiringProcessRequest = hiringProcessRequest().convertFromHttpBody(body)
  expect(HiringProcessRequest.name).toEqual(body.name)
  expect(HiringProcessRequest.startDate).toEqual(new Date(body.startDate))
  expect(HiringProcessRequest.endDate).toEqual(new Date(body.endDate))
  expect(HiringProcessRequest.description).toEqual(body.description)
})

test('should convert to undefined dates when not present', async () => {
  const body = {
    name: 'Test',
    startDate: undefined,
    endDate: undefined,
    description: ''
  }
  const HiringProcessRequest = hiringProcessRequest().convertFromHttpBody(body)
  expect(HiringProcessRequest.startDate).toEqual(undefined)
  expect(HiringProcessRequest.endDate).toEqual(undefined)
})
