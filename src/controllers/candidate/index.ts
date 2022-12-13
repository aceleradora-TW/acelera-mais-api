import { httpResponseHandler } from "@controllers/HttpResponseHandler"
import { Message } from "../../messages/languages/pt-br"
import { Candidate } from "@models/entity/Candidate"
import { importSpreadSheet } from "@service/google-spreadsheet"
import { getRepository } from "typeorm"
import { Challenge } from "@models/entity/Challenge"

const responseHandle = httpResponseHandler()

const mapCandidates = (id) => {
  const normaliseDate = (date) => {
    return date
    const newDate = date.split("/")
    return `${newDate[1]}/${newDate[0]}/${newDate[2]}`
  }

  return (rows) => {
    return rows.map((r) => {
      const timeStamp = normaliseDate(r["Carimbo de data/hora"])
      const email = r["E-mail:"]
      const challenge = new Challenge()
      challenge.hiringProcess = id
      challenge.email = email

      return {
        hiringProcess: { id: parseInt(id) },
        challenge,
        timeStamp,
        email
      }
    })
  }
}

export const importAllCandidate = async (request, response) => {
  try {
    const { id } = request.params
    const { link } = request.body

    const candidatesSheet = await importSpreadSheet(link, mapCandidates(id))
    const candidateRepository = getRepository(Candidate)

    const candidates = await candidateRepository.save(candidatesSheet)

    return responseHandle.createSuccessResponse(
      Message.SUCCESS,
      { id, candidates, count: candidatesSheet.length },
      response
    )
  } catch (error) {
    return responseHandle.createErrorResponse(error, response)
  }
}

export const getAllCandidate = async (request, response) => {
  const { page = 0, count = 50 } = request.query
  const candidateRepository = getRepository(Candidate)
  const candidates = await candidateRepository.find({ skip: page, take: count })
  return response.json({ candidates })
}

export const getCandidate = async (request, response) => {
  const { id } = request.params
  const candidateRepository = getRepository(Candidate)
  const candidate = await candidateRepository.findOne({ where: { id } })
  return response.json({ candidate })
}
