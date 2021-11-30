import { importSpreadSheet } from "src/service/google-spreadsheet"


const mapExercises = (id) => {
  return (rows) => {
    return rows.map(r => {
      return {
        
      }
    })
  }
}

export const importExercises = async (request, response) => {
  const { id } = request.params
  const { link } = request.body

  const exercisesSheet = await importSpreadSheet(link, mapExercises(id))

  return response.json({ message: "Oi Cibely!" })
}