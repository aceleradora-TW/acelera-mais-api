import { itsWorks } from '@controllers/index'
import { generateAccessToken, verifyAccessToken } from '@controllers/auth'
import {
  createHiringProcessEndpoint,
  delAllHiringProcesses,
  editHiringProcess,
  getAllHiringProcesses
} from '@controllers/hiring-process'
import { importSpreadSheet } from '@controllers/spreadsheet'
import { createEvaluation } from '@controllers/exercise'

export const defineRoutes = (app) => {
  app.get('/', verifyAccessToken, itsWorks)
  app.post('/login', generateAccessToken)
  app.patch('/hiring_process/:id', editHiringProcess)
  app.post('/hiring_process', createHiringProcessEndpoint)
  app.get('/hiring_process', verifyAccessToken, getAllHiringProcesses)
  app.delete('/hiring_process/:id', delAllHiringProcesses)

  app.post('/importspreadsheet', importSpreadSheet)
  app.post('/exercise', createEvaluation)
}
