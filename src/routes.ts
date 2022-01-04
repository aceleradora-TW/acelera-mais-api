import { itsWorks } from '@controllers/index'
import { generateAccessToken, verifyAccessToken } from '@controllers/auth'
import {
  createHiringProcessEndpoint,
  delAllHiringProcesses,
  editHiringProcess,
  getAllHiringProcesses
} from '@controllers/hiring-process'
import { getCandidate, getAllCandidate, importAllCandidate } from '@controllers/candidate'
import {
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
  getExerciseById,
  getExerciseByHiringProcessId,
  exportHiringProcessResume,
  updateExercise
} from '@controllers/exercise'
import { importAllExercise } from '@controllers/exercise'
import { getEvaluation, getEvaluations } from '@controllers/evaluation'

export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', generateAccessToken)
  app.get('/hiring_process', getAllHiringProcesses)
  app.post('/hiring_process', verifyAccessToken, createHiringProcessEndpoint)
  app.patch('/hiring_process/:id', verifyAccessToken, editHiringProcess)
  app.delete('/hiring_process/:id', verifyAccessToken, delAllHiringProcesses)

  app.get('/candidate', getAllCandidate)
  app.get('/candidate/:id', getCandidate)
  app.get('/candidate/exercise/hiring_process/:id', exportHiringProcessResume)
  app.post('/candidate/hiring_process/:id', importAllCandidate)

  app.get('/evaluation', getEvaluations)
  app.get('/evaluation/:id', getEvaluation)

  app.get('/exercise', getExerciseByHiringProcessId)
  app.get('/exercise/:id', getExerciseById)
  app.post('/exercise', createEvaluation)
  app.patch('/exercise/:id', updateExercise)
  app.post('/exercise/hiring_process/:id', importAllExercise)
  app.delete('/exercise/:id', deleteEvaluation)

  app.patch('/evaluation/:id', updateEvaluation)
}
