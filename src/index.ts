import './models'
import express from 'express'
<<<<<<< HEAD
import { login } from '@controllers/auth'
import { createHiringProcess, getAllHiringProcesses, delAllHiringProcesses, editHiringProcess } from '@controllers/hiring-process'
import { testeConexao } from '@controllers/spreadsheets'
=======
>>>>>>> e9190f39c65cafd29e4ec55735fa788ef662bc73
import cors from 'cors'
import { defineRoutes } from './routes'

const app = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

<<<<<<< HEAD
app.get('/', itsWorks)
app.post('/login', login)
app.patch('/hiring_process/:id', editHiringProcess)
app.post('/hiring_process', createHiringProcess)
app.get('/hiring_process', getAllHiringProcesses)
app.delete('/hiring_process/:id', delAllHiringProcesses)
app.post('/teste_conexao', testeConexao)
=======
defineRoutes(app)

>>>>>>> e9190f39c65cafd29e4ec55735fa788ef662bc73
app.listen(port, () => {
  console.log(`Server's running in http://localhost:${port}`)
})
