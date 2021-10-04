export const login = (request, response) => {
  const email = request.body.email
  const password = request.body.password
  const emailUser = 'ju@gmail.com'
  const passwordUser = '123456'
  if (email === emailUser && password === passwordUser) {
    return response.json({ message: 'Bem vinda querida Ju!' })
  }

  return response.json({ message: 'tente novamente!' })
}
