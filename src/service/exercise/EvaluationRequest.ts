/* eslint-disable space-before-function-paren */
const scoreRange = (score) => {
  if (score >= 0 && score <= 5) return Math.trunc(score)
  if (score > 5) return 5
  return 0
}

export class EvaluationRequest {
  public mentorName: string;
  public feedback: string;
  public score: number;

  constructor(mentorName: string, feedback: string, score: number) {
    this.mentorName = mentorName
    this.feedback = feedback
    this.score = score
  }

  public static convertFromHttpBody(body) {
    const { mentorName, feedback, score } = body
    return new EvaluationRequest(
      mentorName,
      feedback,
      scoreRange(score)
    )
  }
}
