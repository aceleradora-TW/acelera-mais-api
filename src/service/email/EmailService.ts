const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
import { inviteEmailContent } from '@messages/email/content'

export const EmailService = () => {
  const send = (from, subject, email, content) => {
    const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env

    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD
      }
    });

    let message = {
      from: from,
      to: email,
      subject: subject,
      text: content
    }

    transport.sendMail(message, () => (err, info) => {
      if (err) {
        console.error(err)
      } else {
        console.warn(info)
      }
    })
  }
  return { send }
}
