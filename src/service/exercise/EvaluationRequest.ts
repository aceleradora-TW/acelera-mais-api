const scoreRange = (score) => {
  if (score < 0 || !score) {
    score = 0
  } else if (score > 5) {
    score = 5
  }

  const integerScore = Math.trunc(score)
  return integerScore
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
