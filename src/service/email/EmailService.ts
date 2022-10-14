import { NodemailerService } from "@service/nodemailer/NodemailerService"
import { Message } from "@messages/languages/pt-br"

export const EmailService = () => {
  const send = async (from, subject, email, content, bcc = "") => {
    const message = {
      from: from,
      to: email,
      bcc: bcc,
      subject: subject,
      text: content,
    }
    console.log("chegou aqui")
    ;(await NodemailerService()).transport.sendMail(message, (err, info) => {
      const { envelope, response } = info
      if (err) {
        console.error(Message.EMAIL_NOT_SENT, err)
        return
      }
      console.log(Message.EMAIL_SENT, { envelope, response })
    })
    console.log("aqui tmb")
  }

  return { send }
}
