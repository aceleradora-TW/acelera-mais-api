
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { Evaluation } from '@models/entity/Evaluation'
import { HttpError, HttpStatusCode } from '../HttpError'

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
}
