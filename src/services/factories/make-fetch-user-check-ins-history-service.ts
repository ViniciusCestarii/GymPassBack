import { FetchUserCheckInHistoryService } from "../fetch-user-check-in-history"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export const makeFetchUserCheckInHistoryService = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const service = new FetchUserCheckInHistoryService(prismaCheckInsRepository)
  
  return service
}