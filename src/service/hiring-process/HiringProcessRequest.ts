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
  const hiringProcessRequest = (body) => {
    const { name, description, startDate, endDate } = body
    return {
        name, 
        startDate: new Date(startDate) || undefined,
        endDate: new Date(endDate) || undefined,
        description: description || ''
      }
   }
  return hiringProcessRequest
  }
  return { constructor, convertFromHttpBody }
}