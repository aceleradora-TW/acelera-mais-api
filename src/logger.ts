
import winston from 'winston'
import expressWinston from 'express-winston'
import { Handler } from 'express'

const transports = [new winston.transports.Console()]

const format = winston.format.json()

const logger = winston.createLogger({ transports, format })

const requestLogger = (): Handler => expressWinston.logger({
    transports,
    format,
    meta: true,
    msg: '{{req.method}} {{req.url}}',
    expressFormat: false,
    colorize: false,
    requestWhitelist: ['body']
})

const requestErrorLogger = () => expressWinston.errorLogger({
    transports,
    format,
})

export { requestLogger, requestErrorLogger, logger }