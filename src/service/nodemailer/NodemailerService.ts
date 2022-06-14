import nodemailer from "nodemailer"
import { google } from "googleapis"
import dotenv from "dotenv"
dotenv.config()

const OAuth2 = google.auth.OAuth2

const {
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
  NODEMAILER_REDIRECT_URI,
  NODEMAILER_CLIENT_ID,
  NODEMAILER_CLIENT_SECRET,
  NODEMAILER_REFRESH_TOKEN,
} = process.env

export const NodemailerService = async () => {
  const oauth2Client = new OAuth2(
    NODEMAILER_CLIENT_ID,
    NODEMAILER_CLIENT_SECRET,
    NODEMAILER_REDIRECT_URI
  )

  oauth2Client.setCredentials({
    refresh_token: NODEMAILER_REFRESH_TOKEN,
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token)
    })
  })

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_PASSWORD,
      accessToken,
      clientId: NODEMAILER_CLIENT_ID,
      clientSecret: NODEMAILER_CLIENT_SECRET,
      refreshToken: NODEMAILER_REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  return { transport }
}
