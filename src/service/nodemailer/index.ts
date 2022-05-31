import nodemailer from 'nodemailer'

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env

export const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD
  }
});