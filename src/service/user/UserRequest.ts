export const userRequest = () => {
  const convertFromHttpBody = (body) => {
    const { name, telephone, email, type } = body
    return {
      name,
      telephone: telephone || '',
      email,
      type
    }
  }
  return { convertFromHttpBody }
}