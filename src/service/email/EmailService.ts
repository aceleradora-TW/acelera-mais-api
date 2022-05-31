import { transport } from "@service/nodemailer"

export const EmailService = () => {
  const send = async (from, subject, email, content) => {

    const message = {
      from: from,
      to: email,
      subject: subject,
      text: content
    }

    try {
      const info = await transport.sendMail(message)
      console.log('Email sent:', JSON.stringify(info))
    } catch (error) {
      console.error('Failed to send email:', error.message)
    }

  }
  return { send }
}
