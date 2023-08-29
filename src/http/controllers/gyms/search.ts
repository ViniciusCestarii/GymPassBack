import { makeCreateGymService } from "@/services/factories/make-create-gym-service"
import { makeSearchGymService } from "@/services/factories/make-search-gyms"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const searchGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page} = searchGymQuerySchema.parse(request.query)

    const searchGymService = makeSearchGymService()

    const { gyms } = await searchGymService.execute({ 
      name: q,
      page,
    })

    return reply.status(200).send({
      gyms
    })
}