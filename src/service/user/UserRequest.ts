import { passwordGenerator } from "@service/password/PasswordService"

export const userRequest = () => {
  const convertFromHttpBody = (body) => {
    const { name, telephone, email, type } = body
    return {
      name,
      telephone: telephone || '',
      email,
      type,
      password: passwordGenerator()
    }
  }
  return { convertFromHttpBody }
}