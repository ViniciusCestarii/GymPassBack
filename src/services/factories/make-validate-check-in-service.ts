import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInService } from "../validate-check-in"

export const makeValidateCheckInService = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const service = new ValidateCheckInService(prismaCheckInsRepository)
  
  return service
}