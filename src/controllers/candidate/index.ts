// import { getRepository } from 'typeorm'

import { HttpResponseHandler } from '@controllers/HttpResponseHandler'
import { message } from '../../messages/languages/pt-br'
import { Candidate } from '@models/entity/Candidate'
import { importSpreadSheet } from '../../service/google-spreadsheet'
import { getRepository } from 'typeorm'

const mapCandidates = (id) => {

  const normaliseDate = (date) => {
    const newDate = date.split("/")
    return `${newDate[1]}/${newDate[0]}/${newDate[2]}`
  }

  return (rows) => {

    return rows.map(r => {

      const timeStamp = normaliseDate(r['Carimbo de data/hora'])
      const birthDate = normaliseDate(r['Data de Nascimento:'])

      return {
        hiringProcess: { id: parseInt(id) },
        timeStamp,
        addressEmail: r['Endereço de e-mail'],
        name: r['Nome Completo:'],
        email: r['E-mail:'],
        phone: r['Número de telefone com (DDD):'],
        birthDate,
        genre: r['Qual é sua identidade de gênero?'],
        skinColor: r['Em relação a sua cor, como você autodeclara-se?'],
        instituitionName: r['Nome da sua Instituição de Ensino (Universidade / Faculdade)'],
        courseName: r['Nome do curso:'],
        milestone: r['Previsão de conclusão do curso:'],
        howFound: r['Como descobriu sobre a Aceleradora Ágil?'],
        expectation: r['Quais são suas expectativas para Aceleradora Ágil 20?'],
        motivation: r['O que te motiva a se inscrever e embarcar nesse desafio?'],
        curriculum: r['Currículo:'],
        okCI: r['OK do CI'] || false
      }
    })
  }
}

const responseHandle = new HttpResponseHandler()

export const importCandidates = async (request, response) => {

  try {
    const { id } = request.params
    const { link } = request.body

    const candidatesSheet = await importSpreadSheet(link, mapCandidates(id))
    const candidateRepository = getRepository(Candidate)

    const candidates = await candidateRepository.save(candidatesSheet)

    return responseHandle.createSuccessResponse(message.SUCCESS, { id, candidates }, response)

  } catch (error) {
    return responseHandle.createErrorResponse(error, response)
  }

}