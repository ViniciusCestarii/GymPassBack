import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInService } from "../check-in"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export const makeCheckInService = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const service = new CheckInService(prismaCheckInsRepository, prismaGymsRepository)
  
  return service
}