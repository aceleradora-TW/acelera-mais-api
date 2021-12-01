import { importSpreadSheet } from "src/service/google-spreadsheet"


const mapExercises = (id) => {
  return (rows) => {
    return rows.map(r => {
      return {
        timeStamp: r['Carimbo de data/hora'],
        addressEmail: r['Endereço de e-mail'],
        name: r['Informe seu nome completo'],
        phone: r['Informe o número de um telefone para contato:'],
        exercise: r['Informe qual o exercício que você escolheu:'],
        fileType: r['O que você prefere nos enviar?'],
        fileZip: r['Arquivo . ZIP'],
        fileGithub: r['Nos informe o link completo do seu repositório no GitHub com a solução do exercício.'],
        haveComputer: r['Você possui computador em casa ?'],
        haveInternet: r['Você possui acesso a internet em casa?'],
        haveWebcam: r['Voce Possui Webcam?'],
        canUserWebcam: r['Você se incomodaria em abrir sua Webcam durante as interações quanto a Aceleradora Ágil?'],
        cityState: r['Qual a sua cidade/estado?']
      }
    })
  }
}

export const importExercises = async (request, response) => {
  const { id } = request.params
  const { link } = request.body

  const exercisesSheet = await importSpreadSheet(link, mapExercises(id))
  return response.json(exercisesSheet)
}