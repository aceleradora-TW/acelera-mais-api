const nodemailer = require('nodemailer');

export const sendEmail = (mentorName, mentorPassword, mentorEmail) => {

  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e28dc0c301cd31",
      pass: "fcf678b6be0b6a"
    }
  });

  let message = {
    from: "noreply@acelera-mais.com",
    to: mentorEmail,
    subject: "AceleraMais: Convite para mentora avaliadora!",
    text: `
      Olá, ${mentorName}!
    
      Você foi convidada para ser mentora avaliadora no Acelera Mais. Uhuuuul!!!!

      Por favor, acesse https://aceleramais.com.br, faça o login com o seu e-mail usando a senha abaixo.
    
      Você precisará trocar a senha no primeiro login.
      
      Senha gerada: ${mentorPassword} 
      
      Seja bem vinda!`
  }

  transport.sendMail(message, () => (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}
