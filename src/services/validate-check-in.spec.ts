import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { ValidateCheckInService } from "./validate-check-in"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

// Unit test

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validate Check-in Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(inMemoryCheckInsRepository) //system under test
  })

  it('should be able to validate check-in', async () => {
    const checkIn = await inMemoryCheckInsRepository.create({
      gymId: 'gymID',
      userId: 'userID',
    })

    const { validatedCheckIn } = await sut.execute({
      userId: 'userID',
      checkInId: checkIn.id,
    })

    expect(validatedCheckIn.validatedAt).toEqual(expect.any(Date))
    expect(inMemoryCheckInsRepository.items[0].validatedAt).toEqual(expect.any(Date))
  })

  it('should not be able to validate a non-existent check-in', async () => {
    await expect( sut.execute({
      userId: 'userID',
      checkInId: 'checkInID',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})