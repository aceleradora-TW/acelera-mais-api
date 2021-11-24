import { itsWorks } from '@controllers/index'
import { login } from '@controllers/auth'
import {
  createHiringProcessEndpoint,
  delAllHiringProcesses,
  editHiringProcess,
  getAllHiringProcesses
} from '@controllers/hiring-process'
import { importSpreadSheet } from '@controllers/spreadsheet'
import { createEvaluation, editEvaluation, deleteEvaluation } from '@controllers/exercise'

export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', login)
  app.patch('/hiring_process/:id', editHiringProcess)
  app.post('/hiring_process', createHiringProcessEndpoint)
  app.get('/hiring_process', getAllHiringProcesses)
  app.delete('/hiring_process/:id', delAllHiringProcesses)

  app.post('/importspreadsheet', importSpreadSheet)
  app.post('/exercise', createEvaluation)
  app.patch('/exercise/:id', editEvaluation)
  app.delete('/exercise/:id', deleteEvaluation)
}
