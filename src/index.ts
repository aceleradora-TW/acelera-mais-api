import './models'
import express from 'express'
import { itsWorks } from './controllers'
import { login } from './controllers/auth'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.get('/', itsWorks)
app.post('/login', login)
app.listen(port, () => {
  console.log(`Server's running in http://localhost:${port}`)
})
