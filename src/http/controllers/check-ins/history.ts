import { makeFetchUserCheckInHistoryService } from "@/services/factories/make-fetch-user-check-ins-history-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page} = checkInHistoryQuerySchema.parse(request.query)

    const fetchUserCheckInHistoryService = makeFetchUserCheckInHistoryService()

    const { checkIns } = await fetchUserCheckInHistoryService.execute({
      userId: request.user.sub,
      page,
    })

    return reply.status(200).send({
      checkIns
    })
}