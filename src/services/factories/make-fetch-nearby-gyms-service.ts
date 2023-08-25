import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearbyGymsServiceService } from "../fetch-nearby-gyms"

export const makeFetchNearbyGymsServiceService = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const service = new FetchNearbyGymsServiceService(prismaGymsRepository)
  
  return service
}