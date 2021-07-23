import { getRepository } from 'typeorm'
import { User } from '@models/entity/User'

export const getAllUsers = (request, response) => {
  const users = getRepository(User).find()
  return response.json(users)
}

export const getUser = (request, response) => {
  const { id } = request.params
  const user = getRepository(User).findByIds([id])
  return response.json(user)
}
