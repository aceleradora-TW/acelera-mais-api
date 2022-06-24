import { IncompleteCandidate } from "@models/entity/IncompleteCandidate"
import { getRepository } from "typeorm"

export const IncompleteCandidateService = () => {
  const incompleteCandidateEmails = async (
    addressEmail,
    hiringProcess,
    name
  ) => {
    const incompleteCandidateRepository = getRepository(IncompleteCandidate)
    const createIncompleteCandidate =
      await incompleteCandidateRepository.create({
        adressEmail: addressEmail,
        hiringProcess: hiringProcess.id,
        name: name,
      })
    const saveIncompleteCandidate = await incompleteCandidateRepository.save(
      createIncompleteCandidate
    )
    return saveIncompleteCandidate
  }

  return { incompleteCandidateEmails }
}
