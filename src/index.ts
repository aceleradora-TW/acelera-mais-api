import express from 'express'
import './dbConnection'
import cors from 'cors'
import { defineRoutes } from './routes'

const app = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

defineRoutes(app)

app.listen(port, () => {
  console.log(`Server's running in http://localhost:${port}`)
})
