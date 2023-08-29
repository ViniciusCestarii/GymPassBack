import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"
import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const getUserProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const getUserProfileParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getUserProfileParamsSchema.parse(request.params)

  try {
    const getUserService = makeGetUserProfileService()

    const { user } = await getUserService.execute({ userId: id })
    return reply.status(200).send({
      ...user,
      passwordHash: undefined,
    })
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
      return reply.status(404).send(err.message)
    }

    throw err //fastify will handle this error
  }
}