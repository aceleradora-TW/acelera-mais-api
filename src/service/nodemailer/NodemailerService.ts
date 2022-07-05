import nodemailer from "nodemailer"

export const NodemailerService = async () => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
  })

  return { transport }
}
