import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service"
import { FastifyReply, FastifyRequest } from "fastify"

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const getUserProfile = makeGetUserProfileService()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub 
  })

  return reply.status(200).send({
    user: {
      ...user,
      passwordHash: undefined,
    }
  })
}