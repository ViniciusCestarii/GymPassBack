import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { CheckIn } from "@prisma/client"

// here are the business rules

interface FetchUserCheckInHistoryRequest {
  userId: string
  page: number
}

interface FetchUserCheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryService {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({ userId, page}: FetchUserCheckInHistoryRequest): Promise<FetchUserCheckInHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }
  }
}
