import nodemailer from "nodemailer"
import { google } from "googleapis"
require("dotenv").config()

const OAuth2 = google.auth.OAuth2

const {
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
  NODEMAILER_REDIRECT_URI,
  NODEMAILER_CLIENT_ID,
  NODEMAILER_CLIENT_SECRET,
  NODEMAILER_REFRESH_TOKEN,
} = process.env

const oauth2Client = new OAuth2(
  NODEMAILER_CLIENT_ID,
  NODEMAILER_CLIENT_SECRET,
  NODEMAILER_REDIRECT_URI
)

oauth2Client.setCredentials({
  refresh_token: NODEMAILER_REFRESH_TOKEN,
})

export const NodemailerService = async () => {
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
