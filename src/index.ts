import './models'
import express from 'express'
import { login } from '@controllers/auth'
<<<<<<< HEAD
import { createProcess, editHiringProcess } from '@controllers/hiring-process'
=======
import { createHiringProcess, getAllHiringProcesses } from '@controllers/hiring-process'
>>>>>>> 0c06d9f5b5ef80c510f5cf2ea64a478abbccb3c6
import cors from 'cors'
import { itsWorks } from './controllers'

const app = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.get('/', itsWorks)
app.post('/login', login)
<<<<<<< HEAD
app.post('/hiring_process', createProcess)
app.patch('/hiring_process/:id', editHiringProcess)

=======
app.post('/hiring_process', createHiringProcess)
app.get('/hiring_process', getAllHiringProcesses)
>>>>>>> 0c06d9f5b5ef80c510f5cf2ea64a478abbccb3c6
app.listen(port, () => {
  console.log(`Server's running in http://localhost:${port}`)
})
