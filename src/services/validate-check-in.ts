import { CheckIn, User } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { GymsRepository } from "@/repositories/gyms-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coodinates"
import { MaxDistanceError } from "./errors/max-distance-error"
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error"
import dayjs from "dayjs"
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error"

// here are the business rules

interface ValidateCheckInServiceRequest {
  checkInId: string
}

interface ValidateCheckInServiceResponse {
  validatedCheckIn: CheckIn
}

export class ValidateCheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({ checkInId }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {

    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.createdAt, 
      'minute'
    )

    if(distanceInMinutesFromCheckInCreation > 20){
      throw new LateCheckInValidationError()
    }

    checkIn.validatedAt = new Date()

    const validatedCheckIn = await this.checkInsRepository.save(checkIn)

    return {
      validatedCheckIn
    }
  }
}
