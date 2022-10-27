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
import { Roles } from "./service/user-service/Roles"
import { createLink, verifyLink } from "@controllers/userx/link"

export const defineRoutes = (app) => {
  app.get("/", itsWorks)
  app.post("/login", generateAccessToken)
  app.get(
    "/hiring_process",
    verifyAccessToken([Roles.ADMIN, Roles.MENTOR]),
    getAllHiringProcess
  )
  app.post(
    "/hiring_process",
    verifyAccessToken([Roles.ADMIN]),
    createHiringProcess
  )
  app.patch(
    "/hiring_process/:id",
    verifyAccessToken([Roles.ADMIN]),
    updateHiringProcess
  )
  app.delete(
    "/hiring_process/:id",
    verifyAccessToken([Roles.ADMIN]),
    deleteHiringProcess
  )

  app.get("/candidate", verifyAccessToken([Roles.ADMIN]), getAllCandidate)
  app.get("/candidate/:id", verifyAccessToken([Roles.ADMIN]), getCandidate)
  app.get(
    "/candidate/challenge/hiring_process/:id",
    verifyAccessToken([Roles.ADMIN]),
    exportHiringProcessResume
  )
  app.post(
    "/candidate/hiring_process/:id",
    verifyAccessToken([Roles.ADMIN]),
    importAllCandidate
  )

  app.get(
    "/evaluation",
    verifyAccessToken([Roles.ADMIN, Roles.MENTOR]),
    getAllEvaluation
  )
  app.get(
    "/evaluation/:id",
    verifyAccessToken([Roles.ADMIN, Roles.MENTOR]),
    getEvaluation
  )
  app.patch(
    "/evaluation/:id",
    verifyAccessToken([Roles.ADMIN, Roles.MENTOR]),
    updateEvaluation
  )
  app.post("/evaluation", verifyAccessToken([Roles.ADMIN]), createEvaluation)
  app.delete(
    "/evaluation/:id",
    verifyAccessToken([Roles.ADMIN]),
    deleteEvaluation
  )

  app.get(
    "/challenge",
    verifyAccessToken([Roles.ADMIN, Roles.MENTOR]),
    getChallengeByHiringProcessId
  )
  app.get(
    "/challenge/:id",
    verifyAccessToken([Roles.ADMIN, Roles.MENTOR]),
    getChallengeById
  )
  app.patch("/challenge/:id", verifyAccessToken([Roles.ADMIN]), updateChallenge)
  app.post(
    "/challenge/hiring_process/:id",
    verifyAccessToken([Roles.ADMIN]),
    importAllChallenge
  )

  app.post("/user", verifyAccessToken([Roles.ADMIN]), UserX.createUser)
  app.get("/user", verifyAccessToken([Roles.ADMIN]), UserX.getUser)
  app.get("/user/link", verifyAccessToken(Roles.ADMIN), createLink)
  app.get("/user/link_validation/", verifyAccessToken(Roles.ADMIN), verifyLink)
  app.put(
    "/user/:id",
    verifyAccessToken([Roles.ADMIN, Roles.MENTOR]),
    UserX.updateUser
  )
  app.put(
    "/user/:id/email_verification",
    verifyAccessToken([Roles.ADMIN]),
    UserX.resendEmail
  )

  app.delete("/user/:id", verifyAccessToken([Roles.ADMIN]), deleteUser)

  app.get(
    "/exercise/:id",
    verifyAccessToken([Roles.ADMIN, Roles.MENTOR]),
    getExercise
  )
  app.put(
    "/exercise/:id",
    verifyAccessToken([Roles.ADMIN, Roles.MENTOR]),
    updateExercise
  )
}
