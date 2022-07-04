import { NodemailerService } from "@service/nodemailer/NodemailerService"

export const EmailService = () => {
  const send = async (from, subject, email, content, bcc = "") => {
    const message = {
      from: from,
      to: email,
      bcc: bcc,
      subject: subject,
      text: content,
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
