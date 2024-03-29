import { UserRegistrationStatus } from "@service/Flags"
import { HttpError, HttpStatusCode } from "../HttpError"
import { userService } from "@service/user/UserService"
import md5 from "md5"

const jwt = require("jsonwebtoken")

export const createAccessToken = async (emailUser, passwordUser) => {
  const { SECRET } = process.env
  let auth = true

  const user = await userService().findUserByEmail(emailUser)

  if (!user || user.password !== md5(passwordUser)) {
    throw new HttpError("Unauthorized", HttpStatusCode.UNAUTHORIZED)
  }

  if (user.flag.includes(UserRegistrationStatus.FIRST_LOGIN)) {
    auth = false
  }

  const payload = {
    name: user.name,
    email: user.email,
    role: user.type,
    id: user.id,
  }
  const accessToken = jwt.sign(payload, SECRET, { expiresIn: "1d" })

  return {
    auth,
    accessToken,
    user: payload,
  }
}

export const validateAccessToken = (authorization = "", roles = []) => {
  const { SECRET } = process.env
  const [, token] = authorization.split(" ")
  const role = getRoleToken(authorization)

  if (!role) {
    return false
  }

  const isVerified = jwt.verify(token, SECRET, (err) => {
    return !err
  })

  return isVerified && roles.includes(role)
}

export const getRoleToken = (authorization = "") => {
  const [, token] = authorization.split(" ")
  const { role = null } = jwt.decode(token)
  return role
}
