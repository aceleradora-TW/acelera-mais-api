
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
      throw new HttpError('Errors validating the user:' + errors, HttpStatusCode.BAD_REQUEST)
    }
  }
  return { createUserService }
}
