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
