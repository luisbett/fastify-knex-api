import Knex from 'knex'
import type { Knex as KnexType } from 'knex'
import { env } from './env/index.js'

if(!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable not found.')
}

export const config: KnexType.Config = {
  client: env.DATABASE_CLIENT,
  connection: env.DATABASE_CLIENT === 'sqlite' ? {
    filename: env.DATABASE_URL
  } : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  }
}

export const knex = Knex(config)