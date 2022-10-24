const mapExercises = (exercises) => {
  return exercises.map((exercise) => {
    return {
      idExercise: exercise.id,
      evaluation: {
        id: exercise.evaluation.id,
        mentorName: exercise.evaluation.mentorName,
        feedback: exercise.evaluation.feedback,
        score: exercise.evaluation.score,
      },
      name: exercise.name,
      exerciseType: exercise.exerciseType,
      link: exercise.link,
    }
  })
}
export const challengesAdapter = (challenges) => {
  const challengesMapped = challenges.map((c) => {
    const { id, type, exercises } = c
    const exercisesMapped = mapExercises(exercises)
    return exercisesMapped.map((exercise) => {
      return { id, type, ...exercise }
    })
  })
  const exercisesMapped = []
  challengesMapped.forEach((challenge) => {
    challenge.forEach((exercise) => {
      exercisesMapped.push(exercise)
    })
  })
  return exercisesMapped
}
