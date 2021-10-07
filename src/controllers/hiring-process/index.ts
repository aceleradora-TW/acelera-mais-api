import { getRepository } from 'typeorm'
import { HiringProcess } from '@models/entity/HiringProcess'

export const createProcess = (request, response) => {
  const hiringProcess = {
    name: request.body.name,
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    description: request.body.description
  }

  // nome não pode ser vazio -> preencha algo no nome
  // a

  //  onde faz a logica das regras de negocio
  //  tratar as datas

  const result = getRepository(HiringProcess).create(hiringProcess)

  // return response.status(201).json({ message: 'Processo criado com sucesso' })
  return response.json(result)
}
