import type { FastifyInstance } from "fastify"
import { knex } from "../database.js"
import { z } from 'zod'
import { randomUUID } from "node:crypto"
import { checkAccessToken } from "../middlewares/check-access-token.js"

export async function carsRoutes(app: FastifyInstance) {
  // I can create a global preHandler for all routes inside this file doing the below
  // app.addHook('preHandler', checkAccessToken)

  app.get('/', {
    preHandler: [checkAccessToken]
  }, async () => {
    const cars = await knex('cars').select()

    return {
      cars
    }
  })

  app.get('/:id', {
    preHandler: [checkAccessToken]
  }, async (request) => {
    const getCarsParamsSchema = z.object({
      id: z.uuid()
    })

    const { id } = getCarsParamsSchema.parse(request.params)

    const car = await knex('cars').where('id', id).first()

    return {
      car
    }
  })

  app.post('/', {
    preHandler: [checkAccessToken]
  }, async (request, reply) => {
    const createCarBodySchema = z.object({
      make: z.string(),
      model: z.string(),
      year: z.number().nullable(),
      color: z.string().nullable(),
      price: z.number()
    })

    const { make, model, year, color, price } = createCarBodySchema.parse(request.body)

    await knex('cars')
      .insert({
        id: randomUUID(),
        make,
        model,
        year: year || null,
        color: color || null,
        price
      })

    return reply.status(201).send()
  })
}