import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { Message } from "@messages/languages/pt-br"
import { Challenge } from "@models/entity/Challenge"
import { getRepository } from "typeorm"
import { importSpreadSheet } from "@service/google-spreadsheet"
import { challengeService } from "@service/challenge/ChallengeService"
import { Evaluation } from "@models/entity/Evaluation"
import { Exercise } from "@models/entity/Exercise"
import { IncompleteCandidateService } from "@service/incomplete-candidate/IncompleteCandidateService"
import { challengesAdapter } from "@service/challenge/adapter/ChallengeAdapter"
import { hiringProcessAdapter } from "@controllers/hiring-process/adapter/HiringProcessAdapter"

const httpResponse = httpResponseHandler()

const mapChallenges = (id) => {
  const normaliseDate = (date) => {
    return date
    const newDate = date.split("/")
    return `${newDate[1]}/${newDate[0]}/${newDate[2]}`
  }

  return (rows) => {
    return rows.map((r) => {
      const timeStamp = normaliseDate(r["Carimbo de data/hora"])

      return {
        timeStamp,
        email: r["E-mail:"],
        challenge: r["Informe qual o desafio você escolheu:"],
        fileType: r["Qual é o tipo do desafio:"],
        zip: r["Arquivo . ZIP"],
        github:
          r[
          "Nos informe o link completo do seu repositório no GitHub com a solução do desafio."
          ],
        exerciseStatement: r["Enunciado do Desafio"],
        type: "",
        hiringProcess: { id },
      }
    })
  }
}

const getExerciseType = (challenge) => {
  const { github, zip } = challenge
  if (zip !== "") {
    return { type: "zip", link: zip }
  }
  if (github !== "") {
    return { type: "github", link: github }
  }
  return { type: "Not defined.", link: "" }
}

const createExercise = ({ name, type, link, exerciseStatement }) => {
  const exercise = new Exercise()
  exercise.name = name
  exercise.type = type
  exercise.link = link
  exercise.exerciseStatement = exerciseStatement
  exercise.evaluation = new Evaluation()
  return exercise
}

const groupChallengesByEmail = ({ challenges }) => {
  return challenges.reduce((acc, obj) => {
    const email = obj.email
    if (!acc[email]) {
      acc[email] = { ...obj }
      acc[email].exercises = []
    }
    let typeAndLink = getExerciseType(obj)
    acc[email].exercises.push(
      createExercise({
        name: obj.challenge,
        type: typeAndLink.type,
        link: typeAndLink.link,
        exerciseStatement: obj.exerciseStatement,
      })
    )
    return acc
  }, {})
}

const getChallengeList = (sumirized) => {
  const keys = Object.keys(sumirized)
  return keys.map((key) => sumirized[key])
}

export const importAllChallenge = async (request, response) => {
  try {
    const { id } = request.params
    const { link } = request.body

    // transformo o que tem no link de desafio em dados do javascript
    const challengesSheet = await importSpreadSheet(link, mapChallenges(id))

    // agrupo os desafio por email
    const challengeSumarized = groupChallengesByEmail({
      challenges: challengesSheet,
    })

    // transformo o objeto do agrupamento em um array de objetos contendo dados dos desafios
    const challengeList = getChallengeList(challengeSumarized)

    // crio uma instancia para manipular os desafios no banco
    const challengeRepository = getRepository(Challenge)

    // com a lista de desafios eu salvo
    const challengesPromisse = challengeList.map(async (data) => {
      const {
        timeStamp,
        email,
        challenge,
        fileType,
        zip,
        github,
        hiringProcess,
        exercises,
        exerciseStatement,
      } = data

      const newChallenge = await challengeRepository.findOne({
        where: {
          email,
          hiringProcess,
        },
      })

      if (newChallenge) {
        newChallenge.hiringProcess = hiringProcess
        newChallenge.timeStamp = timeStamp
        newChallenge.challenge = challenge
        newChallenge.github = github
        newChallenge.fileType = fileType
        newChallenge.zip = zip
        newChallenge.exercises = exercises
        newChallenge.exerciseStatement = exerciseStatement
        return await challengeRepository.save(newChallenge)
      }

      return IncompleteCandidateService().createIncompleteCandidate(
        email,
        hiringProcess
      )
    })

    const challenges = []
    await Promise.all(challengesPromisse).then((challenge) =>
      challenges.push(challenge)
    )

    return httpResponse.createSuccessResponse(
      Message.SUCCESS,
      { id, challenges, count: challengesSheet.length },
      response
    )
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}
export const exportHiringProcessResume = async (req, res) => {
  const { id } = req.params
  return res.json({ id })
}

export const getChallengeByHiringProcessId = async (req, res) => {
  const { page, count, hiringProcessId, type, csv = false } = req.query
  try {
    const result = await challengeService().getAllChallenges({
      page,
      count,
      hiringProcessId,
      type,
    })
    return httpResponse.createSuccessResponse(
      Message.FOUND,
      {
        hiringProcessId,
        result: csv ? hiringProcessAdapter(result) : challengesAdapter(result),
      },
      res
    )
  } catch (error) {
    return httpResponse.createErrorResponse(error, res)
  }
}

export const getChallengeById = async (request, response) => {
  try {
    const challengeRepository = getRepository(Challenge)
    const challenge = await challengeRepository.findOne(request.params.id)

    if (!challenge) {
      return response.status(404).json({ message: Message.NOT_FOUND })
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
  const challenge = await challengeRepository.findOne({ where: { id } })
  challenge.type = type
  const result = await challengeRepository.save(challenge)

  return response.json({ result })
}
