import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { getUserProfile } from "./get-user-profile";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh) //user refresh token when it expires on the client

  /* Authenticaded routes */
  app.get('/me',{onRequest: [verifyJWT]}, profile)
  app.get('/user/:id',{onRequest: [verifyJWT]}, getUserProfile)
}