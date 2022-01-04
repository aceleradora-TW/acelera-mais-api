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
  createEvaluation,
  editEvaluation,
  deleteEvaluation,
  getExerciseById,
  getExerciseByHiringProcessId,
  exportHiringProcessResume,
  patchExercise
} from '@controllers/exercise'
import { importExercises } from '@controllers/exercise'
import { getEvaluation, getEvaluations } from '@controllers/evaluation'

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

  app.get('/evaluation', getEvaluations)
  app.get('/evaluation/:id', getEvaluation)

  app.get('/exercise', getExerciseByHiringProcessId)
  app.get('/exercise/:id', getExerciseById)
  app.post('/exercise', createEvaluation)
  app.patch('/exercise/:id', patchExercise)
  app.post('/exercise/hiring_process/:id', importExercises)
  app.delete('/exercise/:id', deleteEvaluation)

  app.patch('/evaluation/:id', editEvaluation)
}
