import { CheckIn, User } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { GymsRepository } from "@/repositories/gyms-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coodinates"

// here are the business rules

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) { }

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calculate distance between user and gym
    // if distance is greater than 100 meters, throw an error
    const distance = getDistanceBetweenCoordinates({ latitude: userLatitude, longitude: userLongitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })

    const MAX_DISTANCE_IN_KILOMETERS= 0.1

    if(distance > MAX_DISTANCE_IN_KILOMETERS){
      throw new Error('User is too far from gym')
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) {
      throw new Error('User already checked in today')
    }

    const checkIn = await this.checkInsRepository.create({
      gymId,
      userId
    })

    return {
      checkIn
    }
  }
}
