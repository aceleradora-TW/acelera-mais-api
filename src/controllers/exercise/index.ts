import { EvaluationRequest } from '@service/exercise/EvaluationRequest'
import { EvaluationService } from '@service/exercise/EvaluationService'
import { HttpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "@messages/languages/pt-br"
import { Exercise } from "@models/entity/Exercise"
import { getRepository } from "typeorm"
import { importSpreadSheet } from "@service/google-spreadsheet"
import { ExerciseService } from "@service/exercise/ExerciseService"
import { Evaluation } from '@models/entity/Evaluation'


const evaluationService = new EvaluationService()
const httpResponseHandler = new HttpResponseHandler()
const exerciseService = new ExerciseService()

export const createEvaluation = async (request, response) => {
  try {
    const evaluationRequest = EvaluationRequest.convertFromHttpBody(request.body)
    const result = await evaluationService.createEvaluationService(evaluationRequest)
    return httpResponseHandler.createSuccessResponse(message.SUCCESS, result, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}

export const editEvaluation = async (request, response) => {
  try {
    const { mentorName, score, feedback } = request.body
    const { id } = request.params
    const evaluationUpdated = await evaluationService.editEvaluation(
      id,
      mentorName,
      score,
      feedback)
    return httpResponseHandler.createSuccessResponse(message.UPDATED, evaluationUpdated, response)
  } catch (error) {
    console.log(error)
    return httpResponseHandler.createErrorResponse(error, response)
  }
}

export const deleteEvaluation = async (request, response) => {
  try {
    const result = await evaluationService.deleteEvaluation(request.params.id)
    return httpResponseHandler.createSuccessResponse(message.REMOVED, result, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
}

const mapExercises = (id) => {

  const normaliseDate = (date) => {
    const newDate = date.split('/')

    return `${newDate[1]}/${newDate[0]}/${newDate[2]}`
  }

  return (rows) => {
    return rows.map(r => {

      const timeStamp = normaliseDate(r['Carimbo de data/hora'])

      return {
        timeStamp,
        addressEmail: r['Endereço de e-mail'],
        name: r['Informe seu nome completo'],
        phone: r['Informe o número de um telefone para contato:'],
        exercise: r['Informe qual o exercício que você escolheu:'],
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
        evaluation: new Evaluation()
      }
    })
  }
}

export const importExercises = async (request, response) => {
  try {
    const { id } = request.params
    const { link } = request.body

    const exercisesSheet = await importSpreadSheet(link, mapExercises(id))
    console.log(exercisesSheet)
    const exerciseRepository = getRepository(Exercise)

    const exercises = exercisesSheet.map(async data => {
      const {
        timeStamp, addressEmail, name, phone, exercise,
        fileType, zip, github, haveComputer, haveInternet,
        haveWebcam, canUseWebcam, cityState, hiringProcess,
        evaluation
      } = data
      const result = await exerciseRepository.findOne({ addressEmail, hiringProcess })
      result.timeStamp = timeStamp
      result.name = name
      result.phone = phone
      result.exercise = exercise
      result.github = github
      result.fileType = fileType
      result.zip = zip
      result.haveComputer = haveComputer
      result.haveInternet = haveInternet
      result.haveWebcam = haveWebcam
      result.canUseWebcam = canUseWebcam
      result.cityState = cityState
      result.hiringProcess = hiringProcess
      result.evaluation = evaluation
      await exerciseRepository.save(result)
      return result
    })

    return httpResponseHandler.createSuccessResponse(message.SUCCESS, { id, exercises, count:exercisesSheet.length  }, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }

}

export const exportHiringProcessResume = async (req, res) => {
  const { id } = req.params
  return res.json({ id })
}

export const getExerciseByHiringProcessId = async (req, res) => {
  const { page, count, hiringProcessId, type, feedback } = req.query
  try {
    const result = await exerciseService.getAllExercises({ page, count, hiringProcessId, type })
    return httpResponseHandler.createSuccessResponse(message.FOUND, { hiringProcessId, result }, res)
  }
  catch (error) {
    return httpResponseHandler.createErrorResponse(error, res)
  }
}

export const getExerciseById = async (request, response) => {
  try {
    const exerciseRepository = getRepository(Exercise)
    const exercise = await exerciseRepository.findOne(request.params.id)

    if (!exercise) {
      return response.status(404).json({ message: message.NOT_FOUND })
    }
    return response.status(200).json(exercise)
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const patchExercise = async (request, response) => {
  const { id } = request.params
  const { type } = request.body

  const exerciseRepository = getRepository(Exercise)
  const exercise = await exerciseRepository.findOne(id)
  exercise.type = type
  const result = await exerciseRepository.save(exercise)

  return response.json({ result })
}

