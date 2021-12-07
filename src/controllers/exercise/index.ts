import { EvaluationRequest } from '@service/exercise/EvaluationRequest'
import { EvaluationService } from '@service/exercise/EvaluationService'

import { HttpResponseHandler } from "@controllers/HttpResponseHandler"
import { message } from "../../messages/languages/pt-br"
import { Exercise } from "@models/entity/Exercise"
import { getRepository } from "typeorm"
import { importSpreadSheet } from "@service/google-spreadsheet"
import { response } from 'express'
import { ExerciseService } from "@service/exercise/ExerciseService"


const evaluationService = new EvaluationService()
const httpResponseHandler = new HttpResponseHandler()
const exerciseService = new ExerciseService()

export const createEvaluation = async (request, response) => {
  try {
    const evaluationRequest = EvaluationRequest.convertFromHttpBody(request.body)
    const result = await evaluationService.createEvaluationService(evaluationRequest)
    return httpResponseHandler.createSuccessResponse(message.FOUND, result, response)
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
        fileZip: r['Arquivo . ZIP'],
        fileGithub: r['Nos informe o link completo do seu repositório no GitHub com a solução do exercício.'],
        haveComputer: r['Você possui computador em casa ?'],
        haveInternet: r['Você possui acesso a internet em casa?'],
        haveWebcam: r['Voce Possui Webcam?'],
        canUseWebcam: r['Você se incomodaria em abrir sua Webcam durante as interações quanto a Aceleradora Ágil?'],
        cityState: r['Qual a sua cidade/estado?'],
        hiringProcess: { id }
      }
    })
  }
}

export const importExercises = async (request, response) => {
  try {
   const { id } = request.params
   const { link } = request.body

   const exercisesSheet = await importSpreadSheet(link, mapExercises(id))
   const exerciseRepository = getRepository(Exercise)

   const exercises = await exerciseRepository.save(exercisesSheet)

   return httpResponseHandler.createSuccessResponse(message.SUCCESS, { id, exercises }, response)
  } catch (error) {
    return httpResponseHandler.createErrorResponse(error, response)
  }
  
}

export const getExerciseByHiringProcessId = async (req, res) => {
  const { hiringProcessId } = req.params
  const {page, count} = req.query
  try {
    const result = await exerciseService.getAllExercisesService(page, count, hiringProcessId)
    return httpResponseHandler.createSuccessResponse(message.SUCCESS, { hiringProcessId, result }, res)
  } 
  catch (error) {
    return httpResponseHandler.createErrorResponse(error, res)
  }
}