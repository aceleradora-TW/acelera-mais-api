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
      //const timeStamp = normaliseDate(r["Carimbo de data/hora"])
      //const birthDate = normaliseDate(r["Data de Nascimento:"])
      const email = r["E-mail:"]
      const challenge = new Challenge()
      challenge.hiringProcess = id
      challenge.addressEmail = email
      return {
        hiringProcess: { id: parseInt(id) },
        challenge,
        //timeStamp,
        idCadidate: r["ID Candidata"] || 'ND',
        addressEmail: r["E-mail:"],
        name: r["Nome Completo:"] || 'ND',
        email,
        phone: r["Número de telefone com (DDD):"] || 'ND',
        //birthDate,
        genre: r["Qual é sua identidade de gênero?"] || 'ND',
        skinColor: r["Em relação a sua cor, como você autodeclara-se?"] || 'ND',
        instituitionName:
          r["Nome da sua Instituição de Ensino (Universidade / Faculdade)"] || 'ND',
        courseName: r["Nome do curso:"] || 'ND',
        milestone: r["Previsão de conclusão do curso:"] || 'ND',
        howFound: r["Como descobriu sobre a Aceleradora Ágil?"] || 'ND',
        expectation: r["Quais são suas expectativas para Aceleradora Ágil?"] || 'ND',
        motivation:
          r["O que te motiva a se inscrever e embarcar nesse desafio?"] || 'ND',
        curriculum: r["Currículo:"] || 'ND',
        city: r["Qual a sua cidade/estado?"] || 'ND',
        sexualOrientation: r["Qual é a sua orientação sexual?"] || 'ND',
        photo: r["Foto"] || 'ND',
        devProfile: r["Quais desses perfis você mais se identifica ?"] || 'ND',
        equipment: r["Você possui algum desses equipamentos ?"] || 'ND',
        okCI: r["OK do CI"] || false,
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
    console.log(candidatesSheet)

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
