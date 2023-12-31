import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error"
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateService()

    const { user } = await authenticateService.execute({ email, password })

    const token = await reply.jwtSign(
      {
        role: user.role,
      }, 
      {
      sign: {
        sub: user.id,
      }
    })

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      }, {
      sign: {
        sub: user.id,
        expiresIn: "7d"
      }
    })

    return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",// all back can access this cookie
      secure: true, // HTTPS only
      sameSite: true, // only send cookie if the request is comming from the same origin
      httpOnly: true, // only send cookie over HTTP(S), not client JavaScript, this will prevent XSS attacks
    })
    .status(200).send({
      token,
    })
  } catch (err) {

    if(err instanceof InvalidCredentialsError) {
      return reply.status(400).send(err.message)
    }

    throw err //fastify will handle this error
  }
}