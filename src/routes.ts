import { itsWorks } from '@controllers/index'
import { generateAccessToken, verifyAccessToken } from '@controllers/auth'
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
  app.post('/login', generateAccessToken)
  app.patch('/hiring_process/:id', verifyAccessToken, editHiringProcess)
  app.post('/hiring_process', verifyAccessToken, createHiringProcessEndpoint)
  app.get('/hiring_process', verifyAccessToken, getAllHiringProcesses)
  app.delete('/hiring_process/:id', verifyAccessToken, delAllHiringProcesses)

  app.post('/importspreadsheet', verifyAccessToken, importSpreadSheet)
  app.post('/exercise', verifyAccessToken, createEvaluation)
  app.patch('/exercise/:id', verifyAccessToken, editEvaluation)
  app.delete('/exercise/:id', deleteEvaluation)
}
