const scoreRange = (score) => {
  if (score >= 0 && score <= 5) return Math.trunc(score)
  if (score > 5) return 5
  return 0
}
export const evaluationRequest = () => {

  const convertFromHttpBody = (body) => {
    const { mentorName, feedback, score } = body
    return {
      mentorName,
      feedback,
      score:scoreRange(score)
    }
  }
  return { convertFromHttpBody }
}
