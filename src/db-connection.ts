import 'reflect-metadata'
import { createConnection, ConnectionOptions } from 'typeorm'

const connect = async () => {
  const local = !process.env.DATABASE_URL
  const url = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/aceleradora_agil'

  const options: ConnectionOptions = {
    type: 'postgres',
    name: 'default',
    url,
    synchronize: true,
    entities: ['**/models/**/*{.ts,.js}'],
    migrations: [
      'src/models/migration/**/*.ts'
    ],
    subscribers: [
      'src/models/subscriber/**/*.ts'
    ],
    cli: {
      entitiesDir: 'src/models/entity',
      migrationsDir: 'src/models/migration',
      subscribersDir: 'src/models/subscriber'
    }
  }

  await createConnection(local
    ? options
    : { ...options, ssl: { rejectUnauthorized: false } })
}
connect()
