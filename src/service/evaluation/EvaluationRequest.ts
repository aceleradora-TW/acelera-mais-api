const scoreRange = (score) => {
  if (score >= 0 && score <= 5) return Math.trunc(score)
  if (score > 5) return 5
  return 0
}
export const evaluationRequest = () => {
  const createEvaluation = (mentorName, feedback, score) => ({
    mentorName,
    feedback,
    score
  })

  const convertFromHttpBody = (body) => {
    const { mentorName, feedback, score } = body
    return createEvaluation(
      mentorName,
      feedback,
      scoreRange(score)
    )
  }
  return { convertFromHttpBody }
}
