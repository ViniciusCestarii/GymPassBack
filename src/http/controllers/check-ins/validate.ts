import { makeCheckInService } from "@/services/factories/make-check-in-service"
import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const validate = async (request: FastifyRequest, reply: FastifyReply) => {
  const validateCheckInParams = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParams.parse(request.params)

    const validateCheckInService = makeValidateCheckInService()

    await validateCheckInService.execute({ 
      checkInId,
    })

    return reply.status(204).send()
}