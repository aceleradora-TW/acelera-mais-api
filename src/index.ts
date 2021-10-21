import './models'
import express from 'express'
import { login } from '@controllers/auth'
import { createProcess, editProcess } from '@controllers/hiring-process'
import cors from 'cors'
import { itsWorks } from './controllers'
const app = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.get('/', itsWorks)
app.post('/login', login)
app.post('/hiring_process', createProcess)
app.put('/hiring_process/:id', editProcess)

app.listen(port, () => {
  console.log(`Server's running in http://localhost:${port}`)
})
