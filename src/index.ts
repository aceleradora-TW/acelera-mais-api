import './models'
import express from 'express'
import { login } from '@controllers/auth'
import { createProcess } from '@controllers/hiring-process'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.post('/login', login)
app.post('/hiring_process', createProcess)
app.listen(port, () => {
  console.log(`Server's running in http://localhost:${port}`)
})
