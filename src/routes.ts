import { itsWorks } from "@controllers/index"
import {
  generateAccessToken,
  verifyAccessToken,
  verifyGuest,
} from "@controllers/auth"
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
import { Roles } from "./service/user-service/Roles"
import { createLink, verifyLink } from "@controllers/userx/link"

const { ADMIN, MENTOR, GUEST } = Roles

export const defineRoutes = (app) => {
  app.get("/", itsWorks)
  app.post("/login", generateAccessToken)
  app.get(
    "/hiring_process",
    verifyAccessToken([ADMIN, MENTOR]),
    getAllHiringProcess
  )
  app.post("/hiring_process", verifyAccessToken([ADMIN]), createHiringProcess)
  app.patch(
    "/hiring_process/:id",
    verifyAccessToken([ADMIN]),
    updateHiringProcess
  )
  app.delete(
    "/hiring_process/:id",
    verifyAccessToken([ADMIN]),
    deleteHiringProcess
  )

  app.get("/candidate", verifyAccessToken([ADMIN]), getAllCandidate)
  app.get("/candidate/:id", verifyAccessToken([ADMIN]), getCandidate)
  app.get(
    "/candidate/challenge/hiring_process/:id",
    verifyAccessToken([ADMIN]),
    exportHiringProcessResume
  )
  app.post(
    "/candidate/hiring_process/:id",
    verifyAccessToken([ADMIN]),
    importAllCandidate
  )

  app.get("/evaluation", verifyAccessToken([ADMIN, MENTOR]), getAllEvaluation)
  app.get("/evaluation/:id", verifyAccessToken([ADMIN, MENTOR]), getEvaluation)
  app.patch(
    "/evaluation/:id",
    verifyAccessToken([ADMIN, MENTOR]),
    updateEvaluation
  )
  app.post("/evaluation", verifyAccessToken([ADMIN]), createEvaluation)
  app.delete("/evaluation/:id", verifyAccessToken([ADMIN]), deleteEvaluation)

  app.get(
    "/challenge",
    verifyAccessToken([ADMIN, MENTOR]),
    getChallengeByHiringProcessId
  )
  app.get(
    "/challenge/:id",
    verifyAccessToken([ADMIN, MENTOR]),
    getChallengeById
  )
  app.patch("/challenge/:id", verifyAccessToken([ADMIN]), updateChallenge)
  app.post(
    "/challenge/hiring_process/:id",
    verifyAccessToken([ADMIN]),
    importAllChallenge
  )

  app.post(
    "/user",
    verifyAccessToken([ADMIN, GUEST]),
    verifyGuest,
    UserX.createUser
  )
  app.get("/user", verifyAccessToken([ADMIN]), UserX.getUser)
  app.get("/user/link", verifyAccessToken(ADMIN), createLink)
  app.get("/user/link_validation/", verifyAccessToken(GUEST), verifyLink)
  app.put("/user/:id", verifyAccessToken([ADMIN, MENTOR]), UserX.updateUser)
  app.put(
    "/user/:id/email_verification",
    verifyAccessToken([ADMIN]),
    UserX.resendEmail
  )

  app.delete("/user/:id", verifyAccessToken([ADMIN]), deleteUser)

  app.get("/exercise/:id", verifyAccessToken([ADMIN, MENTOR]), getExercise)
  app.put("/exercise/:id", verifyAccessToken([ADMIN, MENTOR]), updateExercise)
}
