export const inviteEmailContent = {
  from: 'aceleradorametodosageis@gmail.com',
  subject: 'AceleraMais: Convite para mentora avaliadora!',
  content: (name, password) => {
    return `
    Olá ${name},
    Você foi convidada para ser mentora avaliadora no Acelera Mais.Uhuuuu!!!!
    Por favor, acesse https://aceleramais.com.br, faça o login com o seu e-mail usando a senha abaixo.
    Você precisará trocar a senha no primeiro login.
    Senha gerada: ${password}
    Seja bem vinda!
    `
  }
}