import { User } from "@models/entity/User"
import { getRepository } from "typeorm"

export const findUserByEmail = async (email) => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({email})
  return user
}