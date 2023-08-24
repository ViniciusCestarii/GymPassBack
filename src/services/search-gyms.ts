import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Gym, User } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

// here are the business rules

interface SearchGymRequest {
  name: string
  page: number
}

interface SearchGymResponse {
  gyms: Gym[]
}

export class SearchGymService {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ name, page }: SearchGymRequest): Promise<SearchGymResponse> {

    const gyms = await this.gymsRepository.findManyByName(name, page)

    return {
      gyms
    }
  }
}
