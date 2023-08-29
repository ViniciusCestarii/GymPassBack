import { makeFetchNearbyGymsService} from "@/services/factories/make-fetch-nearby-gyms-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const nearby = async (request: FastifyRequest, reply: FastifyReply) => {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

    const fetchNearbyGymsService = makeFetchNearbyGymsService()

    const { gymsWithDistance } = await fetchNearbyGymsService.execute({ 
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(200).send({
      gymsWithDistance
    })
}