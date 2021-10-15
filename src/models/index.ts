import 'reflect-metadata'
import { createConnection, getConnectionManager, ConnectionOptions } from 'typeorm'

const connect = async () => {
  const { NODE_ENV = 'test', DATABASE_URL = 'postgres://otjnusmuklakrw:4abf3a7bf44d935c5fef29421367a1e143761e6fabcbc524bf81cb12aa7315bf@ec2-44-198-223-154.compute-1.amazonaws.com:5432/d2fdnqlp6m7d1c' } = process.env
  const environment = NODE_ENV || 'development'

  // if (environment.includes('development')) {
  //   await createConnection()
  //   return true
  // }

  const options: ConnectionOptions = {
    type: 'postgres',
    name: NODE_ENV,
    url: DATABASE_URL,
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }

  const connectionManager = getConnectionManager()
  const connection = connectionManager.create(options)

  await connection.connect()
}

connect()
