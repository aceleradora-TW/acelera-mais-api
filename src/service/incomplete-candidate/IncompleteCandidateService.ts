import { negativeEmailContent } from "@messages/email/content"
import { IncompleteCandidate } from "@models/entity/IncompleteCandidate"
import { EmailService } from "@service/email/EmailService"
import { getRepository } from "typeorm"

export const IncompleteCandidateService = () => {
  const { NODE_ENV } = process.env
  const bccValue = NODE_ENV === "prod" ? "jumartinsvargas@gmail.com" : ""
  const negativeEmail = async (email, name) => {
    const { from, subject, content, bcc } = negativeEmailContent
    ;(await EmailService()).send(
      from,
      subject,
      email,
      content(name),
      bcc(bccValue)
    )
  }

  const createIncompleteCandidate = async (
    addressEmail,
    hiringProcess,
    name
  ) => {
    const incompleteCandidateRepository = getRepository(IncompleteCandidate)
    const createIncompleteCandidate = incompleteCandidateRepository.create({
      addressEmail: addressEmail,
      hiringProcess: hiringProcess.id,
      name: name,
    })
    const saveIncompleteCandidate = await incompleteCandidateRepository.save(
      createIncompleteCandidate
    )
    negativeEmail(addressEmail, name)
    return saveIncompleteCandidate
  }

  return { createIncompleteCandidate }
}
