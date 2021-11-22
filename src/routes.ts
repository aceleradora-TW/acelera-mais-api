import { itsWorks } from '@controllers/index'
import { login } from '@controllers/auth'
import {
  createHiringProcessEndpoint,
  delAllHiringProcesses,
  editHiringProcess,
  getAllHiringProcesses
} from '@controllers/hiring-process'
import { importSpreadsheet } from '@controllers/spreadsheet'
import { createEvaluation } from '@controllers/exercise'
import { importCandidates } from '@controllers/candidate'

export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', login)
  app.patch('/hiring_process/:id', editHiringProcess)
  app.post('/hiring_process', createHiringProcessEndpoint)
  app.get('/hiring_process', getAllHiringProcesses)
  app.delete('/hiring_process/:id', delAllHiringProcesses)

  app.post('/candidates', importSpreadsheet)
  app.post('/candidate/hiring_process/:id', importCandidates)
  app.post('/exercise', createEvaluation)
}
