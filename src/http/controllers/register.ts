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

  console.log(name, email, password)

  try {
    const registerService = makeRegisterService()

    await registerService.execute({ name, email, password })
  } catch (err) {
    if(err instanceof UserAlreadyExistsError) {
      return reply.status(409).send(err.message)
    }

    throw err //fastify will handle this error
  }

  return reply.status(201).send()
}