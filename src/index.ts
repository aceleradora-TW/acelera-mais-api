import 'reflect-metadata'
import express from 'express'

const app = express()
const port = process.env.PORT || 3333

app.get('/', (req, res) => {
  return res.json({ message: "it's works!" })
})

app.listen(port, () => {
  console.log(`Server's running in http://localhost:${port}`)
})
