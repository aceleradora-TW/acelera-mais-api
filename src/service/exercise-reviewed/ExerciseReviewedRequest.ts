export class ExerciseReviewedRequest {
  public readonly name: string;
  public readonly feedback: string;
  public readonly score: number;

  constructor(name: string, feedback: string, score: number) {
    this.name = name
    this.feedback = feedback
    this.score = score
  }

  public static convertFromHttpBody(body) {
    const { name, feedback, score } = body
    if (score >= 0 && score <= 5) {
      return new ExerciseReviewedRequest(
        name,
        feedback,
        score
      )
    } else {
      return 'Score should be between 0 and 5'
    }
  }
}
