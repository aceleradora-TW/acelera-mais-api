export class HiringProcessRequest {
  public readonly name: string;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly description: string;

  constructor (name: string, startDate: Date, endDate: Date, description: string) {
    this.name = name
    this.startDate = startDate
    this.endDate = endDate
    this.description = description
  }

  public static convertFromHttpBody (body) {
    const { name, startDate, endDate, description } = body
    return new HiringProcessRequest(
      name,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      description || ''
    )
  }
}
