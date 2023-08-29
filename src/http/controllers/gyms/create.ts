import { makeCreateGymService } from "@/services/factories/make-create-gym-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { name, description, latitude, longitude, phone } = createGymBodySchema.parse(request.body)

    const createGymService = makeCreateGymService()

    const { gym } = await createGymService.execute({ 
      name,
      description,
      latitude,
      longitude,
      phone,

    })

    return reply.status(201).send({
      id: gym.id,
    })
}