import { itsWorks } from '@controllers/index'
import { generateAccessToken, verifyAccessToken } from '@controllers/auth'
import {
  createHiringProcess,
  deleteHiringProcess,
  updateHiringProcess,
  getAllHiringProcess
} from '@controllers/hiring-process'
import { getCandidate, getAllCandidate, importAllCandidate } from '@controllers/candidate'
import {
  getExerciseById,
  getExerciseByHiringProcessId,
  exportHiringProcessResume,
  updateExercise
} from '@controllers/exercise'
import {
  createEvaluation,
  updateEvaluation,
  deleteEvaluation
} from '@controllers/evaluation'
import { importAllExercise } from '@controllers/exercise'
import { getEvaluation, getAllEvaluation } from '@controllers/evaluation'
import { format } from 'path/posix'

export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', generateAccessToken)
  app.get('/hiring_process', getAllHiringProcess)
  app.post('/hiring_process', verifyAccessToken, createHiringProcess)
  app.patch('/hiring_process/:id', verifyAccessToken, updateHiringProcess)
  app.delete('/hiring_process/:id', verifyAccessToken, deleteHiringProcess)

  app.get('/candidate', getAllCandidate)
  app.get('/candidate/:id', getCandidate)
  app.get('/candidate/exercise/hiring_process/:id', exportHiringProcessResume)
  app.post('/candidate/hiring_process/:id', importAllCandidate)

  app.get('/evaluation', getAllEvaluation)
  app.get('/evaluation/:id', getEvaluation)
  app.patch('/evaluation/:id', updateEvaluation)
  app.post('/evaluation', createEvaluation)
  app.delete('/evaluation/:id', deleteEvaluation)

  app.get('/exercise', getExerciseByHiringProcessId)
  app.get('/exercise/:id', getExerciseById)
  app.patch('/exercise/:id', updateExercise)
  app.post('/exercise/hiring_process/:id', importAllExercise)



}
