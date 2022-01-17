export const hiringProcessRequest = () => {
  const convertFromHttpBody = (body) => {
    const { name, description, startDate, endDate } = body
    return {
      name,
      startDate: new Date(startDate) || undefined,
      endDate: new Date(endDate) || undefined,
      description: description || ''
    }
  }
  return { convertFromHttpBody }
}