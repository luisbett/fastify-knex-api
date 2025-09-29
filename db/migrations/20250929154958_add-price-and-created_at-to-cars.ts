import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cars', (table) => {
    table.decimal('price', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cars', (table) => {
    table.dropColumn('price')
    table.dropColumn('created_at')
  })
}

