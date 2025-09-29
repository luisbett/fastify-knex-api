import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cars', (table) => {
    table.uuid('id').primary()
    table.text('make').notNullable()
    table.text('model').notNullable()
    table.integer('year').nullable()
    table.text('color').nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('cars')
}

