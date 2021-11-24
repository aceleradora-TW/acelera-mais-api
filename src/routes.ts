import { itsWorks } from '@controllers/index'
import { login } from '@controllers/auth'
import {
  createHiringProcessEndpoint,
  delAllHiringProcesses,
  editHiringProcess,
  getAllHiringProcesses
} from '@controllers/hiring-process'

import { importCandidates } from '@controllers/candidate'
import { createEvaluation, editEvaluation } from '@controllers/exercise'

export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', login)
  app.patch('/hiring_process/:id', editHiringProcess)
  app.post('/hiring_process', createHiringProcessEndpoint)
  app.get('/hiring_process', getAllHiringProcesses)
  app.delete('/hiring_process/:id', delAllHiringProcesses)

  app.post('/candidate/hiring_process/:id', importCandidates)
  app.post('/exercise', createEvaluation)
  app.patch('/exercise/:id', editEvaluation)
}
