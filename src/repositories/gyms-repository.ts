import { GymWithDistance } from "@/types/gym-with-distance";
import { Gym, Prisma } from "@prisma/client";

export interface findManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  searchManyByName(name: string, page:number): Promise<Gym[]>
  findManyNearby({latitude, longitude} : findManyNearbyParams): Promise<GymWithDistance[]>
}