import { itsWorks } from '@controllers/index'
import { generateAccessToken, verifyAccessToken } from '@controllers/auth'
import {
  createHiringProcessEndpoint,
  delAllHiringProcesses,
  editHiringProcess,
  getAllHiringProcesses
} from '@controllers/hiring-process'

import { getCandidate, getCandidates, importCandidates } from '@controllers/candidate'
import { createEvaluation, editEvaluation, deleteEvaluation, getExerciseById, getExerciseByHiringProcessId, editTypeExercise, exportHiringProcessResume } from '@controllers/exercise'
import { importSpreadSheet } from '@service/google-spreadsheet'
import { importExercises } from '@controllers/exercise'
import { getEvaluation, getEvaluations } from '@controllers/evaluation'

export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', generateAccessToken)
  app.get('/hiring_process', getAllHiringProcesses)
  app.post('/hiring_process', verifyAccessToken, createHiringProcessEndpoint)
  app.patch('/hiring_process/:id', verifyAccessToken, editHiringProcess)
  app.delete('/hiring_process/:id', verifyAccessToken, delAllHiringProcesses)

  app.get('/candidate', getCandidates)
  app.get('/candidate/:id', getCandidate)
  app.get('/candidate/exercise/hiring_process/:id', exportHiringProcessResume)
  app.post('/candidate/hiring_process/:id', importCandidates)
  app.post('/exercise', createEvaluation)
  app.patch('/evaluation/:id', editEvaluation)
  app.post('/importspreadsheet', importSpreadSheet)
  app.post('/exercise', createEvaluation)
  app.post('/exercise/hiring_process/:id', importExercises)
  app.get('/exercise', getExerciseByHiringProcessId)
  app.get('/exercise/:id', getExerciseById)
  app.patch('/exercise/:id', editTypeExercise)

}
