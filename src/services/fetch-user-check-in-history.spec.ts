import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchUserCheckInHistoryService } from "./fetch-user-check-in-history"

// Unit test

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryService

describe('Fetch User Check-in History Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInHistoryService(inMemoryCheckInsRepository) //system under test
  })

  it('should be able to get check-in history', async () => {
    await inMemoryCheckInsRepository.create({
      id: 'checkIn-01',
      userId: 'user-01',
      gymId: 'gym-01',
    })

    await inMemoryCheckInsRepository.create({
      id: 'checkIn-02',
      userId: 'user-01',
      gymId: 'gym-02',
    })

    await inMemoryCheckInsRepository.create({
      id: 'checkIn-03',
      userId: 'user-02',
      gymId: 'gym-02',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page:1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        id: 'checkIn-01',
        userId: 'user-01',
        gymId: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ])
  })
})