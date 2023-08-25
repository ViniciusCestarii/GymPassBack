import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Gym, User } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

// here are the business rules

interface SearchGymServiceRequest {
  name: string
  page: number
}

interface SearchGymServiceResponse {
  gyms: Gym[]
}

export class SearchGymService {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ name, page }: SearchGymServiceRequest): Promise<SearchGymServiceResponse> {

    const gyms = await this.gymsRepository.searchManyByName(name, page)

    return {
      gyms
    }
  }
}
