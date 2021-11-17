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
    return new ExerciseReviewedRequest(
      name,
      feedback,
      score
    )
  }
}
