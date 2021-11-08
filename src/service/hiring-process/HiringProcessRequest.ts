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
}
