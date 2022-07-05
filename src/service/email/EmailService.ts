import { NodemailerService } from "@service/nodemailer/NodemailerService"
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

export const EmailService = async () => {
  const send = async (from, subject, email, content, bcc = "") => {
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

    const message = {
      from: from,
      to: email,
      bcc: bcc,
      subject: subject,
      text: content,
      auth: {
        type: "OAuth2",
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD,
        accessToken,
        clientId: NODEMAILER_CLIENT_ID,
        clientSecret: NODEMAILER_CLIENT_SECRET,
        refreshToken: NODEMAILER_REFRESH_TOKEN,
      },
    }

    try {
      ;(await NodemailerService()).transport.sendMail(message)
      console.log("Email successfully sent")
    } catch (error) {
      console.error("Failed to send email:", error)
    }
  }

  return { send }
}
