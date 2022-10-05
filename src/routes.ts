import { itsWorks } from "@controllers/index"
import { generateAccessToken, verifyAccessToken } from "@controllers/auth"
import {
  createHiringProcess,
  deleteHiringProcess,
  updateHiringProcess,
  getAllHiringProcess,
} from "@controllers/hiring-process"
import {
  getCandidate,
  getAllCandidate,
  importAllCandidate,
} from "@controllers/candidate"
import {
  getChallengeById,
  getChallengeByHiringProcessId,
  exportHiringProcessResume,
  updateChallenge,
} from "@controllers/challenge"
import {
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
} from "@controllers/evaluation"
import { importAllChallenge } from "@controllers/challenge"
import { getEvaluation, getAllEvaluation } from "@controllers/evaluation"
import { deleteUser } from "@controllers/user"
import * as UserX from "@controllers/userx"
import { getExercise, updateExercise } from "@controllers/exercise"

export const defineRoutes = (app) => {
  app.get("/", itsWorks)
  app.post("/login", generateAccessToken)
  app.get("/hiring_process", getAllHiringProcess)
  app.post("/hiring_process", verifyAccessToken, createHiringProcess)
  app.patch("/hiring_process/:id", verifyAccessToken, updateHiringProcess)
  app.delete("/hiring_process/:id", verifyAccessToken, deleteHiringProcess)

  app.get("/candidate", verifyAccessToken, getAllCandidate)
  app.get("/candidate/:id", verifyAccessToken, getCandidate)
  app.get(
    "/candidate/challenge/hiring_process/:id",
    verifyAccessToken,
    exportHiringProcessResume
  )
  app.post(
    "/candidate/hiring_process/:id",
    verifyAccessToken,
    importAllCandidate
  )

  app.get("/evaluation", verifyAccessToken, getAllEvaluation)
  app.get("/evaluation/:id", verifyAccessToken, getEvaluation)
  app.patch("/evaluation/:id", verifyAccessToken, updateEvaluation)
  app.post("/evaluation", verifyAccessToken, createEvaluation)
  app.delete("/evaluation/:id", verifyAccessToken, deleteEvaluation)

  app.get("/challenge", verifyAccessToken, getChallengeByHiringProcessId)
  app.get("/challenge/:id", verifyAccessToken, getChallengeById)
  app.patch("/challenge/:id", verifyAccessToken, updateChallenge)
  app.post(
    "/challenge/hiring_process/:id",
    verifyAccessToken,
    importAllChallenge
  )

  app.post("/user", verifyAccessToken, UserX.createUser)
  app.get("/user", verifyAccessToken, UserX.getUser)
  app.put("/user/:id", verifyAccessToken, UserX.updateUser)
  app.put("/user/:id/email_verification", verifyAccessToken, UserX.resendEmail)
  app.delete("/user/:id", verifyAccessToken, deleteUser)

  app.get("/exercise/:id", verifyAccessToken, getExercise)
  app.put("/exercise/:id", verifyAccessToken, updateExercise)
}
