export const HiringProcessRequest = () => {

  const constructor = (name: string, startDate: Date, endDate: Date, description: string) => {
    return {
    name: name,
    startDate: startDate,
    endDate: endDate,
    description: description
  }
  }
  const convertFromHttpBody = (body) => {
    const { name, startDate, endDate, description } = body
    return HiringProcessRequest{
      name
      startDate ? new Date(startDate) : undefined
      endDate ? new Date(endDate) : undefined
      description || ''
    }
  }
  return { constructor, convertFromHttpBody }
}