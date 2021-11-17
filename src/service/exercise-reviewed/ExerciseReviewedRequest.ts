export class ExerciseReviewedRequest {
  public readonly name: string;
  public readonly feedback: string;
  public readonly score: string;

  constructor(name: string, feedback: string, score: string) {
    this.name = name
    this.feedback = feedback
    this.score = score
  }

  public static convertFromHttpBody(body) {
    const { name, feedback, score } = body
    return new ExerciseReviewedRequest(
      name,
      feedback,
      score >= 0 && score <= 5 ? score : 'Score should be between 0 and 5'
    )
  }
}
