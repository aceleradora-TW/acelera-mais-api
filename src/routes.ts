import { itsWorks } from '@controllers/index'
import { generateAccessToken } from '@controllers/auth'
import {
  createHiringProcessEndpoint,
  delAllHiringProcesses,
  editHiringProcess,
  getAllHiringProcesses
} from '@controllers/hiring-process'

import { importCandidates } from '@controllers/candidate'
import { createEvaluation, editEvaluation } from '@controllers/exercise'
import { importSpreadSheet } from './service/google-spreadsheet'

export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', generateAccessToken)
  app.patch('/hiring_process/:id', editHiringProcess)
  app.post('/hiring_process', createHiringProcessEndpoint)
  app.get('/hiring_process', getAllHiringProcesses)
  app.delete('/hiring_process/:id', delAllHiringProcesses)

  app.post('/candidate/hiring_process/:id', importCandidates)
  app.post('/exercise', createEvaluation)
  app.patch('/exercise/:id', editEvaluation)
  app.post('/importspreadsheet', importSpreadSheet)
  app.post('/exercise', createEvaluation)
  app.patch('/exercise/:id', editEvaluation)
}
