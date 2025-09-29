import fastify from "fastify"
import { env } from "./env/index.js"
import { carsRoutes } from "./routes/cars.js"

const app = fastify()

app.register(carsRoutes, {
  prefix: 'cars'
})

app.listen({
  port: env.PORT,
}).then(() => {
  console.log(`Server running on port ${env.PORT}`)
})