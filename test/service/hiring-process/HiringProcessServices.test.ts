import { HiringProcessRequest } from '../../../src/service/hiring-process/HiringProcessRequest'
import { HiringProcessService } from '../../../src/service/hiring-process/HiringProcessService'
import { HttpStatusCode } from '../../../src/service/HttpError'
import { HiringProcess } from '../../../src/models/entity/HiringProcess'
import { mock } from 'jest-mock-extended'
import { Repository } from 'typeorm'
export const repositoryMock = mock<Repository<any>>()
jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm')
  return {
    ...actual,
    getRepository: () => { return repositoryMock }
  }
})

const service = new HiringProcessService()

test('should return Entity when request is valid', async () => {
  const validRequest = new HiringProcessRequest('test', new Date(), new Date(), 'test')
  const validEntity = new HiringProcess()
  validEntity.name = validRequest.name
  validEntity.startDate = validRequest.startDate
  validEntity.endDate = validRequest.endDate
  validEntity.description = validRequest.description
  repositoryMock.create.mockResolvedValue(validEntity)
  repositoryMock.save.mockResolvedValue(validEntity)
  const response = await service.createHiringProcessService(validRequest)
  expect(response).toEqual(validEntity)
})

test('should return HttpError with status 400 when request is not valid', async () => {
  repositoryMock.create.mockResolvedValue(new HiringProcess())
  const invalidRequest = new HiringProcessRequest(undefined, undefined, undefined, undefined)
  try {
    await service.createHiringProcessService(invalidRequest)
  } catch (error) {
    expect(error.status).toEqual(HttpStatusCode.BAD_REQUEST)
  }
})
