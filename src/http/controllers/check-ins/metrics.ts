import { makeGetUserMetricsService } from "@/services/factories/make-get-user-metrics-service"
import { FastifyReply, FastifyRequest } from "fastify"

export const metrics = async (request: FastifyRequest, reply: FastifyReply) => {

    const getUserMetricsService = makeGetUserMetricsService()

    const { checkInsCount } = await getUserMetricsService.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      checkInsCount
    })
}