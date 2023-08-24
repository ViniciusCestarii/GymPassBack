import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { getUserProfile } from "./controllers/get-user-profile";

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.get('/user:id', getUserProfile)

  app.post('/sessions', authenticate)
}