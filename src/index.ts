import './models'
import express from 'express'
import { itsWorks } from './controllers'

const app = express()
const port = process.env.PORT || 9000

app.get('/', itsWorks)

app.listen(port, () => {
  console.log(`Server's running in http://localhost:${port}`)
})
