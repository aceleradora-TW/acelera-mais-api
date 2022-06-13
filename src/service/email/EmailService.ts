import { transport } from "@service/nodemailer"
const jwt = require("jsonwebtoken")

export const EmailService = () => {
  const send = async (from, subject, email, content) => {
    const message = {
      from: from,
      to: email,
      subject: subject,
      text: content,
    }

    try {
      const info = await transport.sendMail(message)
      console.log("Email sent:", JSON.stringify(info))
    } catch (error) {
      console.error("Failed to send email:", error.message)
    }
  }

  const sendEmail = (user, message) => {
    const { from, subject, content } = message
    const { name, password, email } = user
    const { NODEMAILER_SECRET } = process.env
    const decodedPassword = jwt.verify(password, NODEMAILER_SECRET)
    send(from, subject, email, content(name, decodedPassword))
  }
  return { send, sendEmail }
}
