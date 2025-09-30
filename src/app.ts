import fastify from "fastify"
import cookie from '@fastify/cookie'
import { carsRoutes } from "./routes/cars.js"
import { sessionsRoutes } from "./routes/sessions.js"

export const app = fastify()

app.register(cookie)

// I can create a global preHandler for all routes of my project doing the below
// (it needs to be before the routes registration below)
// app.addHook('preHandler', checkAccessToken)

app.register(sessionsRoutes, {
  prefix: 'sessions'
})
app.register(carsRoutes, {
  prefix: 'cars'
})