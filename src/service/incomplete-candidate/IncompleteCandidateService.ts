import { negativeEmailContent } from "@messages/email/content"
import { IncompleteCandidate } from "@models/entity/IncompleteCandidate"
import { EmailService } from "@service/email/EmailService"
import { getRepository } from "typeorm"

export const IncompleteCandidateService = () => {
  const negativeEmail = (email, name, message, bcc) => {
    const { from, subject, content } = message
    EmailService().send(from, subject, email, content(name), bcc)
  }

  const sendEmailToIncompleteCandidate = (email, name, message, bcc) => {
    negativeEmail(email, name, message, bcc)
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
    sendEmailToIncompleteCandidate(
      addressEmail,
      name,
      negativeEmailContent,
      "jumartinsvargas@gmail.com"
    )
    return saveIncompleteCandidate
  }

  return { createIncompleteCandidate }
}
