import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { getUserProfile } from "./controllers/get-user-profile";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middlewares/verify-jwt";

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)

  app.get('/user:id', getUserProfile)

  app.post('/sessions', authenticate)

  /* Authenticaded routes */
  app.get('/me',{onRequest: [verifyJWT]}, profile)
}