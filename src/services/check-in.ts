import { CheckIn, User } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/check-ins-repository"

// here are the business rules

interface CheckInServiceRequest {
  userId: string
  gymId: string
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({userId, gymId }: CheckInServiceRequest) : Promise<CheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.create({
      gymId,
      userId
    })

    return {
      checkIn
    }
  }
}
