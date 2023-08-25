import { CheckIn, User } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { GymsRepository } from "@/repositories/gyms-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coodinates"
import { MaxDistanceError } from "./errors/max-distance-error"
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error"

// here are the business rules

interface ValidateCheckInServiceRequest {
  userId: string
  checkInId: string
}

interface ValidateCheckInServiceResponse {
  validatedCheckIn: CheckIn
}

export class ValidateCheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({ userId, checkInId }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {

    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validatedAt = new Date()

    const validatedCheckIn = await this.checkInsRepository.save(checkIn)

    return {
      validatedCheckIn
    }
  }
}
