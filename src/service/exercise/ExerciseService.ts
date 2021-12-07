// import { Exercise } from "@models/entity/Exercise"
// import { HttpError, HttpStatusCode } from "@service/HttpError"
// import { getRepository } from "typeorm"

// export class ExerciseService {
//   public async getAllExercisesService(page, count, id) {
//     const exerciseRepository = getRepository(Exercise)
//     //const exercises = await exerciseRepository.find({take:count, skip:page})
//     const exercises = await exerciseRepository.createQueryBuilder("exercise").where({hiringProcess: id}).take(count).skip(page)
//     //.leftJoinAndSelect("exercise.hiringProcess", "hiringProcess").getMany()
//     // if(exercises.length == 0) {
//     //   throw new HttpError("Não foram encontradas informações.", HttpStatusCode.NOT_FOUND)
//     // }
//     return exercises
//   }
// }