import winston from "winston"
import expressWinston from "express-winston"
import { Handler } from "express"

const transports = [new winston.transports.Console()]

const format = winston.format.combine(
  winston.format.cli(),
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
  )
)

const logger = winston.createLogger({ transports, format })

const requestLogger = (): Handler =>
  expressWinston.logger({
    transports,
    format,
    meta: true,
    msg: "{{req.method}} {{req.url}} body: {{JSON.stringify(req.body)}}, headers: {{JSON.stringify(req.headers)}}",
    expressFormat: false,
    colorize: false,
    requestWhitelist: ["body"],
  })

const requestErrorLogger = () =>
  expressWinston.errorLogger({
    transports,
    format,
  })

export { requestLogger, requestErrorLogger, logger }
