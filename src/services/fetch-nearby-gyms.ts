import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Gym, User } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"
import { GymWithDistance } from "@/types/gym-with-distance"

// here are the business rules

interface FetchNearbyGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsServiceResponse {
  gymsWithDistance: GymWithDistance[]
}

export class FetchNearbyGymsServiceService {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ userLatitude, userLongitude }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceResponse> {

    const gymsWithDistance = await this.gymsRepository.findManyNearby({
      latitude: userLatitude, 
      longitude: userLongitude
    })

    return {
      gymsWithDistance
    }
  }
}
