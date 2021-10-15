import 'reflect-metadata'
import { createConnection, getConnectionManager, ConnectionOptions } from 'typeorm'

const connect = async () => {
  const { NODE_ENV = null, DATABASE_URL = '' } = process.env
  const environment = NODE_ENV || 'development'

  if (environment.includes('development')) {
    await createConnection()
    return true
  }

  const options: ConnectionOptions = {
    type: 'postgres',
    name: NODE_ENV,
    url: DATABASE_URL
  }

  const connectionManager = getConnectionManager()
  const connection = connectionManager.create(options)

  await connection.connect()
}

connect()
