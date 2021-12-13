import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { Evaluation } from '@models/entity/Evaluation'
import { HttpError, HttpStatusCode } from '../HttpError'
import { Exercise } from '@models/entity/Exercise'

export class EvaluationService {
  public async createEvaluationService(evaluationRequest: any) {
    const evaluationRepository = getRepository(Evaluation)
    const evaluationEntity = await evaluationRepository.create(evaluationRequest)
    await this.validateEvaluation(evaluationEntity)
    const evaluationEntitySaved = await evaluationRepository.save(evaluationEntity)
    return evaluationEntitySaved
  }

  private async validateEvaluation(evaluation) {
    const errors = await validate(evaluation)
    if (errors.length > 0) {
      throw new HttpError('Errors validating the evaluation:' + errors, HttpStatusCode.BAD_REQUEST)
    }
  }

  public async editEvaluation(id, mentorName, score, feedback) {
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

    this.validateEvaluation(evaluation)
    await evaluationRepository.update(id, evaluation)
    const evaluationUpdated = await evaluationRepository.findOne(id)
    return evaluationUpdated
  }

  public async deleteEvaluation(id) {
    const evaluationRepository = getRepository(Evaluation)
    const evaluationDeleted = await evaluationRepository.delete(id)

    if (evaluationDeleted.affected === 0) {
      throw new HttpError('Evaluation not found with: ' + id, HttpStatusCode.NOT_FOUND)
    }
    return evaluationDeleted
  }
}

export const searchExercise = async (request, response) => {
  const { type } = request.query
  const { feedBack } = request.query
  const exerciseRepository = getRepository(Exercise)

  try {
    const result =
      exerciseRepository.find()
    console.log(result)
    return response.body


  } catch {

  }
}
