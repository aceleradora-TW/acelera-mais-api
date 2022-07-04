export const inviteEmailContent = {
  from: "AceleraMais <aceleradorametodosageis@gmail.com>",
  subject: "AceleraMais: Convite para mentora avaliadora!",
  content: (name, password) => {
    return `
    Olá ${name},
    Você foi convidada para ser mentora avaliadora no Acelera Mais. Uhuuuu!!!!
    Por favor, acesse https://aceleramais.com.br, faça o login com o seu e-mail usando a senha abaixo.
    Você precisará trocar a senha no primeiro login.
    Senha gerada: ${password}
    Seja bem vinda!
    `
  },
}

export const rememberEmailContent = {
  from: "AceleraMais <aceleradorametodosageis@gmail.com>",
  subject: "AceleraMais: Lembrete do convite para ser mentora avaliadora!",
  content: (name, password) => {
    return `
    Olá ${name},
    Estamos enviando está mensagem para lhe relembrar do convite para ser mentora no AceleraMais.
    Por favor, acesse https://aceleramais.com.br, faça o login com o seu e-mail usando a senha abaixo.
    Você precisará trocar a senha no primeiro login.
    Senha gerada: ${password}
    Seja bem vinda!
    `
  },
}

export const negativeEmailContent = {
  from: "Aceleradora Ágil <aceleradorametodosageis@gmail.com>",
  subject: "Aceleradora Ágil: 2ª Fase Processo seletivo",
  bcc: (addressEmail) => addressEmail,
  content: (name) => {
    return `
    Olá ${name},

    Infelizmente, neste momento você não foi selecionada(o) para seguir para a próxima fase do nosso processo seletivo. Pois não foi possível identificar sua inscrição na primeira fase do nosso processo.
    
    Recomendamos que siga por dentro das oportunidades divulgadas em nossos perfis no Facebook e LinkedIn, que além da Aceleradora Ágil, contamos com uma série de outras parcerias com empresas renomadas de tecnologia. Sua aplicação para a Aceleradora Ágil também será bem vinda para próximas edições.
    
    Facebook: facebook.com/cipucrs
    LinkedIn: linkedin.com/company/cipucrs
    Ficamos à disposição
    `
  },
}
