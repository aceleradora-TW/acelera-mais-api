import { negativeEmailContent } from "@messages/email/content"
import { IncompleteCandidate } from "@models/entity/IncompleteCandidate"
import { EmailService } from "@service/email/EmailService"
import { getRepository } from "typeorm"

export const IncompleteCandidateService = () => {
  const negativeEmail = (email, name, message) => {
    const { from, subject, content } = message
    EmailService().send(from, subject, email, content(name))
  }

  const sendEmailToIncompleteCandidate = (email, name, message) => {
    negativeEmail(email, name, message)
  }

  const createIncompleteCandidate = async (
    addressEmail,
    hiringProcess,
    name
  ) => {
    const incompleteCandidateRepository = getRepository(IncompleteCandidate)
    const createIncompleteCandidate = incompleteCandidateRepository.create({
      adressEmail: addressEmail,
      hiringProcess: hiringProcess.id,
      name: name,
    })
    sendEmailToIncompleteCandidate(addressEmail, name, negativeEmailContent)
    const saveIncompleteCandidate = await incompleteCandidateRepository.save(
      createIncompleteCandidate
    )
    return saveIncompleteCandidate
  }

  return { createIncompleteCandidate }
}
