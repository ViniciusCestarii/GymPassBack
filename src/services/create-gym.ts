import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Gym, User } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

// here are the business rules

interface CreateGymServiceRequest {
  name: string
  description: string | null
  phone: string
  latitude: number
  longitude: number
}

interface CreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ name, description, phone, latitude, longitude }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {

    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude
    })

    return {
      gym
    }
  }
}
