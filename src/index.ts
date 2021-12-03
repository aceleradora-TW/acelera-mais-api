import express from 'express'
import { connect } from './db-connection'
import cors from 'cors'
import { defineRoutes } from './routes'
require('dotenv').config()

connect()

const app = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

defineRoutes(app)

app.listen(port, () => {
  console.log(`Server's running in http://localhost:${port}`)
})
