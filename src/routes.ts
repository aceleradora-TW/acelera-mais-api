import { itsWorks } from '@controllers/index'
import { generateAccessToken, verifyAccessToken } from '@controllers/auth'
import {
  createHiringProcessEndpoint,
  delAllHiringProcesses,
  editHiringProcess,
  getAllHiringProcesses
} from '@controllers/hiring-process'

import { importCandidates } from '@controllers/candidate'
import { createEvaluation, editEvaluation, deleteEvaluation, getExerciseById, getExerciseByHiringProcessId } from '@controllers/exercise'
import { importSpreadSheet } from '@service/google-spreadsheet'
import { importExercises } from '@controllers/exercise'

export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', generateAccessToken)
  app.patch('/hiring_process/:id', verifyAccessToken, editHiringProcess)
  app.post('/hiring_process', verifyAccessToken, createHiringProcessEndpoint)
  app.get('/hiring_process', getAllHiringProcesses)
  app.delete('/hiring_process/:id', verifyAccessToken, delAllHiringProcesses)

  app.delete('/exercise/:id', deleteEvaluation)
  app.post('/candidate/hiring_process/:id', importCandidates)
  app.post('/exercise', createEvaluation)
  app.patch('/exercise/:id', editEvaluation)
  app.post('/importspreadsheet', importSpreadSheet)
  app.post('/exercise', createEvaluation)
  app.patch('/exercise/:id', editEvaluation)
  app.post('/exercise/hiring_process/:id', importExercises)
  app.get('/exercise', getExerciseByHiringProcessId)
  app.get('/exercise/:id', getExerciseById)
}
