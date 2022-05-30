const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

export const EmailService = () => {
  const send = (mentorName, mentorPassword, mentorEmail) => {
    const { EMAIL, PASSWORD, SECRET_PASSWORD } = process.env
    const decodingPassword = jwt.verify(mentorPassword, SECRET_PASSWORD);

    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD
      }
    });

    let message = {
      from: "aceleradorametodosageis@gmail.com",
      to: mentorEmail,
      subject: "AceleraMais: Convite para mentora avaliadora!",
      text: `
      Olá, ${mentorName}!
    
      Você foi convidada para ser mentora avaliadora no Acelera Mais. Uhuuuul!!!!

      Por favor, acesse https://aceleramais.com.br, faça o login com o seu e-mail usando a senha abaixo.
    
      Você precisará trocar a senha no primeiro login.
      
      Senha gerada: ${decodingPassword} 
      
      Seja bem vinda!`
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
