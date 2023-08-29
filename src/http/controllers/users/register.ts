import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error"
import { makeRegisterService } from "@/services/factories/make-register-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()

    const { user } = await registerService.execute({ name, email, password })

    return reply.status(201).send({userId: user.id})

  } catch (err) {
    if(err instanceof UserAlreadyExistsError) {
      return reply.status(409).send(err.message)
    }

    throw err //fastify will handle this error
  }
}