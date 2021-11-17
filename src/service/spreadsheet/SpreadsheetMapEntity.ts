export class SpreadsheetEntityModel {
  public readonly idSpreadsheet: number;
  public readonly timeStamp: Date;
  public readonly adressEmail: string;
  public readonly name: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly birthDate: Date;
  public readonly genre: string;
  public readonly skinColor: string;
  public readonly instituitionName: string;
  public readonly courseName: string;
  public readonly milestone: Date;
  public readonly howFound: string;
  public readonly expectation: string;
  public readonly motivation: string;
  public readonly curriculum: string;
  public readonly okCI: boolean;

  constructor (idSpreadsheet: number,
    timeStamp: Date,
    adressEmail: string,
    name: string,
    email: string,
    phone: string,
    birthDate: Date,
    genre: string,
    skinColor: string,
    instituitionName: string,
    courseName: string,
    milestone: Date,
    howFound: string,
    expectation: string,
    motivation: string,
    curriculum: string,
    okCI: boolean) {
    this.idSpreadsheet = idSpreadsheet
    this.timeStamp = timeStamp
    this.adressEmail = adressEmail
    this.name = name
    this.email = email
    this.phone = phone
    this.birthDate = birthDate
    this.genre = genre
    this.skinColor = skinColor
    this.instituitionName = instituitionName
    this.courseName = courseName
    this.milestone = milestone
    this.howFound = howFound
    this.expectation = expectation
    this.motivation = motivation
    this.curriculum = curriculum
    this.okCI = okCI
  }

  public static spreadsheetFactory (rows) {
    return new SpreadsheetEntityModel(
      rows[0],
      rows[1] ? new Date(rows[1]) : undefined,
      rows[2],
      rows[3],
      rows[4],
      rows[5],
      rows[6] ? new Date(rows[6]) : undefined,
      rows[7],
      rows[8],
      rows[9],
      rows[10],
      rows[11] ? new Date(rows[11]) : undefined,
      rows[12],
      rows[13],
      rows[14],
      rows[15],
      rows[16]
    )
  }
}
