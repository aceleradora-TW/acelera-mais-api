import { URL } from "url"

export const connection = async (request, response) => {
  console.log(request.body)
  const { urlSheet } = request.body
  const { hiringProcessID } = request.params.id
  try {
    const link = new URL(urlSheet)
    const idLink = link.pathname.split('/')[3]
    const sheetConnection = await connectSheet(idLink)
    await sheetConnection.loadInfo()
    const sheetFirst = sheetConnection.sheetsByIndex[0]
    const spreadsheets = (await sheetFirst.getRows()).map((row) => {
      return {
        idSpreadsheet: row._rawData[0],
        timeStamp: row._rawData[1],
        adressEmail: row._rawData[2],
        name: row._rawData[3],
        email: row._rawData[4],
        phone: row._rawData[5],
        birthDate: row._rawData[6],
        genre: row._rawData[7],
        skinColor: row._rawData[8],
        instituitionName: row._rawData[9],
        courseName: row._rawData[10],
        milestone: row._rawData[11],
        howFound: row._rawData[12],
        expectation: row._rawData[13],
        motivation: row._rawData[14],
        curriculum: row._rawData[15],
        okCI: row._rawData[16],
        hiringProcessID
      }
    })

function connectSheet(idLink: string) {
      throw new Error("Function not implemented.")
    }
