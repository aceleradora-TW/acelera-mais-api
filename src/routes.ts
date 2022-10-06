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
  app.post("/hiring_process", verifyAccessToken(["admin"]), createHiringProcess)
  app.patch(
    "/hiring_process/:id",
    verifyAccessToken(["admin"]),
    updateHiringProcess
  )
  app.delete(
    "/hiring_process/:id",
    verifyAccessToken(["admin"]),
    deleteHiringProcess
  )

  app.get("/candidate", verifyAccessToken(["admin", "mentor"]), getAllCandidate)
  app.get(
    "/candidate/:id",
    verifyAccessToken(["admin", "mentor"]),
    getCandidate
  )
  app.get(
    "/candidate/challenge/hiring_process/:id",
    verifyAccessToken(["admin", "mentor"]),
    exportHiringProcessResume
  )
  app.post(
    "/candidate/hiring_process/:id",
    verifyAccessToken(["admin", "mentor"]),
    importAllCandidate
  )

  app.get(
    "/evaluation",
    verifyAccessToken(["admin", "mentor"]),
    getAllEvaluation
  )
  app.get(
    "/evaluation/:id",
    verifyAccessToken(["admin", "mentor"]),
    getEvaluation
  )
  app.patch(
    "/evaluation/:id",
    verifyAccessToken(["admin", "mentor"]),
    updateEvaluation
  )
  app.post("/evaluation", verifyAccessToken(["admin"]), createEvaluation)
  app.delete("/evaluation/:id", verifyAccessToken(["admin"]), deleteEvaluation)

  app.get(
    "/challenge",
    verifyAccessToken(["admin", "mentor"]),
    getChallengeByHiringProcessId
  )
  app.get(
    "/challenge/:id",
    verifyAccessToken(["admin", "mentor"]),
    getChallengeById
  )
  app.patch("/challenge/:id", verifyAccessToken(["admin"]), updateChallenge)
  app.post(
    "/challenge/hiring_process/:id",
    verifyAccessToken(["admin"]),
    importAllChallenge
  )

  app.post("/user", verifyAccessToken(["admin", "mentor"]), UserX.createUser)
  app.get("/user", verifyAccessToken(["admin", "mentor"]), UserX.getUser)
  app.put("/user/:id", verifyAccessToken(["admin", "mentor"]), UserX.updateUser)
  app.put(
    "/user/:id/email_verification",
    verifyAccessToken(["admin", "mentor"]),
    UserX.resendEmail
  )
  app.delete("/user/:id", verifyAccessToken(["admin", "mentor"]), deleteUser)

  app.get("/exercise/:id", verifyAccessToken(["admin", "mentor"]), getExercise)
  app.put(
    "/exercise/:id",
    verifyAccessToken(["admin", "mentor"]),
    updateExercise
  )
}
