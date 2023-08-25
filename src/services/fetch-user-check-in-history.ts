import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { CheckIn } from "@prisma/client"

// here are the business rules

interface FetchUserCheckInHistoryServiceRequest {
  userId: string
  page: number
}

interface FetchUserCheckInHistoryServiceResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryService {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({ userId, page}: FetchUserCheckInHistoryServiceRequest): Promise<FetchUserCheckInHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }
  }
}
