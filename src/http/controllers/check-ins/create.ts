import { MaxNumberOfCheckInsError } from "@/services/errors/max-number-of-check-ins-error"
import { makeCheckInService } from "@/services/factories/make-check-in-service"
import { makeCreateGymService } from "@/services/factories/make-create-gym-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

    const checkInService = makeCheckInService()

    try {

    const { checkIn } = await checkInService.execute({ 
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(201).send({
      id: checkIn.id,
    })
  } catch (err) {
      if(err instanceof MaxNumberOfCheckInsError) {
        return reply.status(401).send(err.message)
      }
  }
}