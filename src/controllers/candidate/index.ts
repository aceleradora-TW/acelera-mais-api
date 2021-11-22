// import { getRepository } from 'typeorm'

import { message } from '@messages/languages/pt-br'
import { Candidate } from '@models/entity/Candidate'
import { importSpreadSheet } from 'src/service/google-spreadsheet'
import { getRepository } from 'typeorm'

const mapCandidates = (id) => {
  return (rows) => {
    const normalizeDate = date => {
      const newDate = date.split('/')
      return `${newDate[0]}/${newDate[1]}/${newDate[2]}`
    }

    return rows.map(r => {
      const timeStamp = normalizeDate(r['Carimbo de data/hora'])
      const birthDate = normalizeDate(r['Data de Nascimento:'])
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

export const importCandidates = async (request, response) => {
  const { id } = request.params
  const { link } = request.body
  const candidatesSheet = await importSpreadSheet(link, mapCandidates(id))
  const candidateRepository = getRepository(Candidate)
  const candidates = await candidateRepository.save(candidatesSheet)

  return response.json({ id, candidates, message: message.SUCCESS })
}
