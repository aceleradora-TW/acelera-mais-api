import { UserRegistrationStatus } from "@service/Flags"
import { HttpError, HttpStatusCode } from "../HttpError"
import { userService } from "@service/user/UserService"

const jwt = require("jsonwebtoken")

export const createAccessToken = async (emailUser, passwordUser) => {
  const { SECRET, NODEMAILER_SECRET } = process.env
  let auth = true

  const encodePassword = jwt.sign(passwordUser, NODEMAILER_SECRET)

  const user = await userService().findUserByEmail(emailUser)

  if (!user || user.password !== encodePassword) {
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
  const accessToken = jwt.sign(payload, SECRET, { expiresIn: '1m' })
  return {
    auth,
    accessToken,
    user: payload,
  }
}

export const validateAccessToken = (authHeaders) => {
  const { SECRET } = process.env
  const accessToken = authHeaders && authHeaders.split(" ")[1]

  const isAuthenticated = jwt.verify(accessToken, SECRET, (err) => {
    return !err
  })
  return isAuthenticated
}
