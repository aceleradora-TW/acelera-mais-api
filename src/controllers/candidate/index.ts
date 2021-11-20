import { importSpreadSheet } from '../../service/google-spreadsheet'
import { getRepository } from 'typeorm'
import { Candidate } from '@models/entity/Candidate'

const mapCandidates = rows => {
  const candidate = {
    timeStamp: 'Carimbo de data/hora',
    addressEmail: 'Endereço de e-mail',
    name: 'Nome Completo:',
    email: 'E-mail:',
    phone: 'Número de telefone com (DDD):',
    birthDate: 'Data de Nascimento:',
    genre: 'Qual é sua identidade de gênero?',
    skinColor: 'Em relação a sua cor, como você autodeclara-se?',
    instituitionName: 'Nome da sua Instituição de Ensino (Universidade / Faculdade)',
    courseName: 'Nome do curso:',
    milestone: 'Previsão de conclusão do curso:',
    howFound: 'Como descobriu sobre a Aceleradora Ágil?',
    expectation: 'Quais são suas expectativas para Aceleradora Ágil 20?',
    motivation: 'O que te motiva a se inscrever e embarcar nesse desafio?',
    curriculum: 'Currículo:',
    okCI: 'OK do CI'
  }

  return rows.map(r => {
    return {
      timeStamp: r[candidate.timeStamp],
      adressEmail: r[candidate.addressEmail],
      name: r[candidate.name],
      email: r[candidate.email],
      phone: r[candidate.phone],
      birthDate: r[candidate.birthDate],
      genre: r[candidate.genre],
      skinColor: r[candidate.skinColor],
      instituitionName: r[candidate.instituitionName],
      courseName: r[candidate.courseName],
      milestone: r[candidate.milestone],
      howFound: r[candidate.howFound],
      expectation: r[candidate.expectation],
      motivation: r[candidate.motivation],
      curriculum: r[candidate.curriculum],
      okCI: r[candidate.okCI]
    }
  })
}

export const importCandidates = async (request, response) => {
  // const { id } = request.params
  const { link } = request.body

  const candidates = await importSpreadSheet({ link }, mapCandidates)
  const candidateRepository = getRepository(Candidate)
  const result = await candidateRepository.save(candidates)

  return response.json({ result })
}
