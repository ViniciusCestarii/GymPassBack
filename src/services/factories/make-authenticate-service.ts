import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "../authenticate"

export const makeAuthenticateService = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new AuthenticateService(prismaUsersRepository)
  
  return service
}