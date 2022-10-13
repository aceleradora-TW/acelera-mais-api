export const hiringProcessAdapter = (hiringProcesses) => {
  const getPropertyFromExercises = (exercises, property) =>
    exercises.map((exercise) => exercise.evaluation[property] ?? "")

  return hiringProcesses.map((h) => ({
    name: h.name,
    email: h.addressEmail,
    phone: h.phone,
    birthDate: h.candidate.birthDate,
    genre: h.candidate.genre || "",
    skinColor: h.candidate.skinColor || "",
    instituitionName: h.candidate.instituitionName || "",
    courseName: h.candidate.courseName || "",
    milestone: h.candidate.milestone || "",
    howFound: h.candidate.howFound || "",
    expectation: h.candidate.expectation || "",
    motivation: h.candidate.motivation || "",
    curriculum: h.candidate.curriculum || "",
    okCI: h.candidate.okCI || "",
    challenge: h.challenge,
    fileType: h.fileType,
    zip: h.zip,
    github: h.github,
    haveComputer: h.haveComputer,
    haveInternet: h.haveInternet,
    haveWebcam: h.haveWebcam,
    canUseWebcam: h.canUseWebcam,
    cityState: h.cityState,
    createdAt: h.createdAt,
    feedback: getPropertyFromExercises(h.exercises, "feedback"),
    mentorName: getPropertyFromExercises(h.exercises, "mentorName"),
    score: getPropertyFromExercises(h.exercises, "score"),
    updateAt: h.updateAt,
  }))
}
