import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export const checkInsRoutes = async (app: FastifyInstance) => {
    /* Authenticaded routes */
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-in/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-in/:checkInId/validate', {onRequest: [verifyUserRole('ADMIN')]}, validate)
}