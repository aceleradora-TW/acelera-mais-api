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

  const options: ConnectionOptions = {
    type: 'postgres',
    name: 'default',
    url,
    synchronize: true,
    logging: true,
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

  await createConnection(local ? options : optionsSsl)
}
connect()
