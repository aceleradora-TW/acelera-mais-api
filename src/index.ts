require('dotenv').config({ path: '../.env' })

import express from 'express'
import { connect } from './db-connection'
import cors from 'cors'
import { defineRoutes } from './routes'
import { requestLogger, requestErrorLogger, logger } from './logger'

const start = async () => {
  try {
    logger.info('Establishing database connection...');
    await connect()
    logger.info('Database connection established!');

    logger.info('Starting application server...');

    const app = express()
    const port = process.env.PORT || 9000

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({ origin: '*' }))
    app.use(requestLogger())

    defineRoutes(app)

    app.use(requestErrorLogger())

    app.listen(port, () => {
      logger.info(`Server's running in http://localhost:${port}`)
    })
  } catch (error) {
    throw new Error(`Failed to start application server: ${error.message}`)
  }
}

start().catch((error) => {
  logger.error(error.message, error.stack)
  process.exit(1)
})