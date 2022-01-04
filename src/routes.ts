import { itsWorks } from '@controllers/index'
import { login } from '@controllers/auth'
import {
  createHiringProcess,
  deleteHiringProcess,
  updateHiringProcess,
  getAllHiringProcess
} from '@controllers/hiring-process'
import { importSpreadSheet } from '@controllers/spreadsheet'
import { createEvaluation, editEvaluation, deleteEvaluation } from '@controllers/exercise'

export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', login)
  app.patch('/hiring_process/:id', updateHiringProcess)
  app.post('/hiring_process', createHiringProcess)
  app.get('/hiring_process', getAllHiringProcess)
  app.delete('/hiring_process/:id', deleteHiringProcess)

  app.post('/importspreadsheet', importSpreadSheet)
  app.post('/exercise', createEvaluation)
  app.patch('/exercise/:id', editEvaluation)
  app.delete('/exercise/:id', deleteEvaluation)
}
