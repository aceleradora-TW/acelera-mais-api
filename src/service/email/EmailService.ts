const nodemailer = require('nodemailer');

export const sendEmail = (mentorName, mentorPassword, mentorEmail) => {

  let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "aceleradorametodosageis@gmail.com",
      pass: "VDR1ehc_eha1cgj7bxw"
    }
  });

  let message = {
    from: "aceleramaisteste@gmail.com",
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
