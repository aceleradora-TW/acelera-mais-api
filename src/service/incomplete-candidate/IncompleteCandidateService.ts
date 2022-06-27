import { negativeEmailContent } from "@messages/email/content"
import { IncompleteCandidate } from "@models/entity/IncompleteCandidate"
import { EmailService } from "@service/email/EmailService"
import { getRepository } from "typeorm"

export const IncompleteCandidateService = () => {
  const { NODE_ENV } = process.env
  const negativeEmail = (email, name, message) => {
    const { from, subject, content, bcc } = message
    EmailService().send(from, subject, email, content(name), bcc(NODE_ENV))
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
    const saveIncompleteCandidate = await incompleteCandidateRepository.save(
      createIncompleteCandidate
    )
    sendEmailToIncompleteCandidate(addressEmail, name, negativeEmailContent)
    return saveIncompleteCandidate
  }

  return { createIncompleteCandidate }
}
