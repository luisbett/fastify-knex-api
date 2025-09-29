import type { FastifyInstance } from "fastify"
import { knex } from "../database.js"
import { z } from 'zod'
import { randomUUID } from "node:crypto"

export async function carsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const cars = await knex('cars').select()

    return {
      cars
    }
  })

  app.get('/:id', async (request) => {
    const getCarsParamsSchema = z.object({
      id: z.uuid()
    })

    const { id } = getCarsParamsSchema.parse(request.params)

    const car = await knex('cars').where('id', id).first()

    return {
      car
    }
  })

  app.post('/', async (request, reply) => {
    const createCardBodySchema = z.object({
      make: z.string(),
      model: z.string(),
      year: z.number().nullable(),
      color: z.string().nullable(),
      price: z.number()
    })

    const { make, model, year, color, price } = createCardBodySchema.parse(request.body)

    await knex('cars')
      .insert({
        id: randomUUID(),
        make,
        model,
        year,
        color,
        price
      })

    return reply.status(201).send()
  })
}