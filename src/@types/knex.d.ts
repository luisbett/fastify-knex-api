import { Knex } from 'knex'

declare module 'knex/types/tables.js' {
  interface Tables {
    cars: {
      id: string
      make: string
      model: string
      year?: number | null
      color?: string | null
      price: number
      created_at: string
    }
  }
}