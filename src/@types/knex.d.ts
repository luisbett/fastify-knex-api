import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    cars: {
      id: string
      make: string
      model: string
      year?: number
      color?: string
      price: number
      created_at: string
    }
  }
}