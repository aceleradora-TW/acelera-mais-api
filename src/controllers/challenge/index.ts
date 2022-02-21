import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "@messages/languages/pt-br"
import { Challenge } from "@models/entity/Challenge"
import { getRepository } from "typeorm"
import { importSpreadSheet } from "@service/google-spreadsheet"
import { challengeService } from "@service/challenge/ChallengeService"
import { Evaluation } from "@models/entity/Evaluation"
import { Exercise } from "@models/entity/Exercise"
import { create } from "domain"

const httpResponse = httpResponseHandler()

const mapChallenges = (id) => {

  const normaliseDate = (date) => {
    const newDate = date.split('/')
    return `${newDate[1]}/${newDate[0]}/${newDate[2]}`
  }

  return (rows) => {
    return rows.map(r => {

      //const timeStamp = normaliseDate(r['Carimbo de data/hora'])
      const timeStamp = r['Carimbo de data/hora']

      return {
        timeStamp,
        addressEmail: r['Endereço de e-mail'],
        name: r['Informe seu nome completo'],
        phone: r['Informe o número de um telefone para contato:'],
        challenge: r['Informe qual o exercício que você escolheu:'],
        fileType: r['O que você prefere nos enviar?'],
        zip: r['Arquivo . ZIP'],
        github: r['Nos informe o link completo do seu repositório no GitHub com a solução do exercício.'],
        haveComputer: r['Você possui computador em casa ?'],
        haveInternet: r['Você possui acesso a internet em casa?'],
        haveWebcam: r['Voce Possui Webcam?'],
        canUseWebcam: r['Você se incomodaria em abrir sua Webcam durante as interações quanto a Aceleradora Ágil?'],
        cityState: r['Qual a sua cidade/estado?'],
        type: '',
        hiringProcess: { id },
      }
    })
  }
}

const getExerciseType = (challenge) => {

  let typeLink = { type: "Não existe exercicio.", link: '' }

  challenge.zip !== "" && (typeLink = { type: 'zip', link: challenge.zip })
  challenge.github !== "" && (typeLink = { type: 'github', link: challenge.github })

  return typeLink
}

const createExercise = ({ name, type, link }) => {
  const exercise = new Exercise()
  exercise.name = name
  exercise.type = type
  exercise.link = link
  exercise.evaluation = new Evaluation()
  return exercise
}

const groupChallengesByEmail = ({ challenges, id }) => {
  return challenges.reduce((acc, obj) => {
    const addressEmail = obj.addressEmail
    if (!acc[addressEmail]) {
      acc[addressEmail] = { ...obj }
      acc[addressEmail].exercises = []
    }
    let typeAndLink = getExerciseType(obj)
    acc[addressEmail].exercises.push(createExercise({
      name: obj.challenge,
      type: typeAndLink.type,
      link: typeAndLink.link
    }))
    return acc;
  }, {});
}

const getChallengeList = (sumirized) => {
  const keys = Object.keys(sumirized)
  return keys.map(key => sumirized[key])
}

export const importAllChallenge = async (request, response) => {

  const { id } = request.params
  const { link } = request.body

  // transformo o que tem no link de desafio em dados do javascript
  const challengesSheet = await importSpreadSheet(link, mapChallenges(id))

  // agrupo os desafio por email
  const challengeSumarized = groupChallengesByEmail({ challenges: challengesSheet, id })

  // transformo o objeto do agrupamento em um array de objetos contendo dados dos desafios
  const challengeList = getChallengeList(challengeSumarized)

  // crio uma instancia para manipular os desafios no banco
  const challengeRepository = getRepository(Challenge)

  // com a lista de desafios eu salvo 
  const challengesPromisse = challengeList.map(async data => {
    const {
      timeStamp, addressEmail, name, phone, challenge,
      fileType, zip, github, haveComputer, haveInternet,
      haveWebcam, canUseWebcam, cityState, hiringProcess, exercises
    } = data

    const newChallenge = await challengeRepository.findOne({ addressEmail, hiringProcess })
    newChallenge.hiringProcess = hiringProcess
    newChallenge.timeStamp = timeStamp
    newChallenge.name = name
    newChallenge.phone = phone
    newChallenge.challenge = challenge
    newChallenge.github = github
    newChallenge.fileType = fileType
    newChallenge.zip = zip
    newChallenge.haveComputer = haveComputer
    newChallenge.haveInternet = haveInternet
    newChallenge.haveWebcam = haveWebcam
    newChallenge.canUseWebcam = canUseWebcam
    newChallenge.cityState = cityState
    newChallenge.exercises = exercises
    return await challengeRepository.save(newChallenge)
  })

  const challenges = []
  await Promise.all(challengesPromisse).then(challenge => challenges.push(challenge))

  return httpResponse.createSuccessResponse(message.SUCCESS, { id, challenges, count: challengesSheet.length }, response)
}

export const exportHiringProcessResume = async (req, res) => {
  const { id } = req.params
  return res.json({ id })
}

export const getChallengeByHiringProcessId = async (req, res) => {
  const { page, count, hiringProcessId, type, feedback } = req.query
  try {
    const result = await challengeService().getAllChallenges({ page, count, hiringProcessId, type })
    return httpResponse.createSuccessResponse(message.FOUND, { hiringProcessId, result }, res)
  }
  catch (error) {
    return httpResponse.createErrorResponse(error, res)
  }
}

export const getChallengeById = async (request, response) => {
  try {
    const challengeRepository = getRepository(Challenge)
    const challenge = await challengeRepository.findOne(request.params.id)

    if (!challenge) {
      return response.status(404).json({ message: message.NOT_FOUND })
    }
    return response.status(200).json(challenge)
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const updateChallenge = async (request, response) => {
  const { id } = request.params
  const { type } = request.body

  const challengeRepository = getRepository(Challenge)
  const challenge = await challengeRepository.findOne(id)
  challenge.type = type
  const result = await challengeRepository.save(challenge)

  return response.json({ result })
}

