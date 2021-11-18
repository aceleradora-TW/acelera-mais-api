import 'reflect-metadata'
import { createConnection, ConnectionOptions } from 'typeorm'

const connect = async () => {
  const local = !process.env.DATABASE_URL
  const url = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/aceleradora_agil'
  console.log('DB_URL:' + url)
  const optionsSsl: ConnectionOptions = {
    type: 'postgres',
    name: 'default',
    url,
    ssl: {
      rejectUnauthorized: false
    },
    synchronize: true,
    entities: ['**/models/**/*{.ts,.js}']
  }

  const options: ConnectionOptions = {
    type: 'postgres',
    name: 'default',
    url,
    synchronize: true,
    entities: ['**/models/**/*{.ts,.js}']
  }

  await createConnection(local ? options : optionsSsl)
}
connect()
