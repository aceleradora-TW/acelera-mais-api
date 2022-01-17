const scoreRange = (score) => {
  if (score >= 0 && score <= 5) return Math.trunc(score)
  if (score > 5) return 5
  return 0
}
export const evaluationRequest = () => {

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
  return { convertFromHttpBody }
}
