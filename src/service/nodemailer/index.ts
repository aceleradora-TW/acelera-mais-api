import nodemailer from "nodemailer"

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
})
