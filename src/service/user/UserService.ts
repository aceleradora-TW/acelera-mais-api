
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { User } from '@models/entity/User'
import { HttpError, HttpStatusCode } from '../HttpError'

export const userService = () => {
  const createUserService = async (userRequest: any) => {
    const userRepository = getRepository(User)
    const userEntity = await userRepository.create(userRequest)
    validateUser(userEntity)
    const userEntitySaved = await userRepository.save(userEntity)
    return userEntitySaved
  }

  const validateUser = async (user) => {
    const errors = await validate(user)
    if (errors.length > 0) {
      throw new HttpError('Errors validating the user:' + errors, HttpStatusCode.NOT_FOUND)
    }
  }
  const editUser = async ({ id, name, email, telephone, type }) => {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne(id)
    if (!user) {
      throw new HttpError('User not found with: ' + id, HttpStatusCode.BAD_REQUEST)
    }

    if (name) {
      user.name = name
    }
    if (email) {
      user.email = email
    }
    if (telephone) {
      user.telephone = telephone
    }
    if (type) {
      user.type = type
    }
    validateUser(user)
    const result = await userRepository.save(user)
    return result
  }

  return { createUserService, editUser }
}