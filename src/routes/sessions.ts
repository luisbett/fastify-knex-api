import type { FastifyInstance } from "fastify"
import { knex } from "../database.js"
import { z } from 'zod'

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createSessionBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = createSessionBodySchema.parse(request.body)

    const user = await knex('users').where('email', email).first()

    if(user.password !== password) {
      return reply.status(403).send('Invalid credentials.')
    }

    // Implement
    const accessToken = 'andsjasndjkansd'

    reply.setCookie('access_token', accessToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return reply.status(201).send()
  })
}