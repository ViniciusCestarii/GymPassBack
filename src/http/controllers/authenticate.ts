import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "@/services/authenticate"
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error"
import { RegisterService } from "@/services/register"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(prismaUsersRepository)

    await authenticateService.execute({ email, password })
  } catch (err) {

    if(err instanceof InvalidCredentialsError) {
      return reply.status(400).send(err.message)
    }

    throw err //fastify will handle this error
  }

  return reply.status(200).send()
}