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
  getChallengeById,
  getChallengeByHiringProcessId,
  exportHiringProcessResume,
  updateChallenge
} from '@controllers/challenge'
import {
  createEvaluation,
  updateEvaluation,
  deleteEvaluation
} from '@controllers/evaluation'
import { importAllChallenge } from '@controllers/challenge'
import { getEvaluation, getAllEvaluation } from '@controllers/evaluation'
import { createUser, deleteUser } from '@controllers/user'
import { format } from 'path/posix'
import { getUser } from '@controllers/user'



export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', generateAccessToken)
  app.get('/hiring_process', getAllHiringProcess)
  app.post('/hiring_process', verifyAccessToken, createHiringProcess)
  app.patch('/hiring_process/:id', verifyAccessToken, updateHiringProcess)
  app.delete('/hiring_process/:id', verifyAccessToken, deleteHiringProcess)

  app.get('/candidate', getAllCandidate)
  app.get('/candidate/:id', getCandidate)
  app.get('/candidate/challenge/hiring_process/:id', exportHiringProcessResume)
  app.post('/candidate/hiring_process/:id', importAllCandidate)

  app.get('/evaluation', getAllEvaluation)
  app.get('/evaluation/:id', getEvaluation)
  app.patch('/evaluation/:id', updateEvaluation)
  app.post('/evaluation', createEvaluation)
  app.delete('/evaluation/:id', deleteEvaluation)

  app.get('/challenge', getChallengeByHiringProcessId)
  app.get('/challenge/:id', getChallengeById)
  app.patch('/challenge/:id', updateChallenge)
  app.post('/challenge/hiring_process/:id', importAllChallenge)

  app.post('/user', createUser)
  app.get('/user', getUser)
  app.delete('/user/:id', deleteUser)

}
