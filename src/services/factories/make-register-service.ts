import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterService } from "../register"

export const makeRegisterService = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new RegisterService(prismaUsersRepository)

  return service
}