import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { Evaluation } from '@models/entity/Evaluation'
import { HttpError, HttpStatusCode } from '../HttpError'
// import { evaluationRequest } from './EvaluationRequest'


export const evaluationService = () => {

  // const requestEvaluation = evaluationRequest()
  const createEvaluationService = async (evaluationRequest: any) => {
    const evaluationRepository = getRepository(Evaluation)
    const evaluationEntity = await evaluationRepository.create(evaluationRequest)
    validateEvaluation(evaluationEntity)
    const evaluationEntitySaved = await evaluationRepository.save(evaluationEntity)
    return evaluationEntitySaved
    // await validateEvaluation(evaluationEntity)
    // if (evaluationEntity) {
    // } else {
    //   throw new HttpError('Errors validating the evaluation: ', HttpStatusCode.BAD_REQUEST)
    // }
    // const evaluationValidated = await validateEvaluation(evaluationEntity)

  }

  const validateEvaluation = async ({ evaluation }) => {
    const errors = await validate(evaluation)
    if (errors.length > 0) {
      throw new HttpError('Errors validating the evaluation:' + errors, HttpStatusCode.BAD_REQUEST)
    }
    return validateEvaluation
  }

  const editEvaluation = async ({ id, mentorName, score, feedback }) => {
    const evaluationRepository = getRepository(Evaluation)
    const evaluation = await evaluationRepository.findOne(id)
    if (!evaluation) {
      throw new HttpError('Evaluation not found with: ' + id, HttpStatusCode.BAD_REQUEST)
    }

    if (mentorName) {
      evaluation.mentorName = mentorName
    }

    if (score) {
      evaluation.score = score
    }

    if (feedback) {
      evaluation.feedback = feedback
    }

    validateEvaluation(evaluation)
    const result = await evaluationRepository.save(evaluation)
    return result
  }

  const deleteEvaluation = async (id) => {
    const evaluationRepository = getRepository(Evaluation)
    const evaluationDeleted = await evaluationRepository.delete(id)

    if (evaluationDeleted.affected === 0) {
      throw new HttpError('Evaluation not found with: ' + id, HttpStatusCode.NOT_FOUND)
    }
    return evaluationDeleted
  }

  return { createEvaluationService, editEvaluation, deleteEvaluation }
}
