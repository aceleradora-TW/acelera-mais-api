const nodemailer = require('nodemailer');

export const EmailService = () => {
  const send = async (from, subject, email, content) => {
    const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env

    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD
      }
    });

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
