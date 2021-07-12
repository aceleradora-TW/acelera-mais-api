import express from 'express'

const server = express()
const port = process.env.PORT || 3333

server.get('/', (req, res) => {
  return res.json({ message: "it's works!" })
})

server.listen(port, () => {
  console.log(`Server's running in http://localhost:${port}`)
})
