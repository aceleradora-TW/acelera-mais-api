
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { Evaluation } from '@models/entity/Evaluation'
import { HttpError, HttpStatusCode } from '../HttpError'

export class EvaluationService {
  public async createEvaluationService (evaluationRequest: any) {
    const evaluationRepository = getRepository(Evaluation)
    const evaluationEntity = await evaluationRepository.create(evaluationRequest)
    await this.validateEvaluation(evaluationEntity)
    const evaluationEntitySaved = await evaluationRepository.save(evaluationEntity)
    return evaluationEntitySaved
  }

  private async validateEvaluation (evaluation) {
    const errors = await validate(evaluation)
    if (errors.length > 0) {
      throw new HttpError('Errors validating the evaluation:' + errors, HttpStatusCode.BAD_REQUEST)
    }
  }

  public async editEvaluation (id, mentorName, score, feedback) {
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

    const evaluationUpdated = await evaluationRepository.update(id, evaluation)
    return evaluationUpdated
  }

  public async deleteEvaluation (id) {
    const evaluationRepository = getRepository(Evaluation)
    const evaluationDeleted = await evaluationRepository.delete(id)

    if (evaluationDeleted.affected === 0) {
      throw new HttpError('Evaluation not found with: ' + id, HttpStatusCode.BAD_REQUEST)
    }
    return evaluationDeleted
  }
}
