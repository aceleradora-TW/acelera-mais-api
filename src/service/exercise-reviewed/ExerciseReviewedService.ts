
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { ExerciseReviewed } from '@models/entity/ExerciseReviewed'
import { HttpError, HttpStatusCode } from '../HttpError'

export class ExerciseReviewedService {
  public async createExerciseReviewedService(exerciseReviewedRequest: any) {
    const exerciseReviewedRepository = getRepository(ExerciseReviewed)
    const exerciseReviewedEntity = await exerciseReviewedRepository.create(exerciseReviewedRequest)
    await this.validateExerciseReviewed(exerciseReviewedEntity)
    const exerciseReviewedEntitySaved = await exerciseReviewedRepository.save(exerciseReviewedEntity)
    return exerciseReviewedEntitySaved
  }

  private async validateExerciseReviewed(exerciseReviewed) {
    const errors = await validate(exerciseReviewed)
    if (errors.length > 0) {
      throw new HttpError('Errors validating the exercise reviewed:' + errors, HttpStatusCode.BAD_REQUEST)
    }
  }
}
