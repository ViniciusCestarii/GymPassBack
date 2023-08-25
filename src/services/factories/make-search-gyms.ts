import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymService } from "../search-gyms"

export const makeSearchGymService = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const service = new SearchGymService(prismaGymsRepository)
  
  return service
}