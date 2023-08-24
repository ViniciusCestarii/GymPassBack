import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { CheckInService } from "./check-in"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { randomUUID } from "crypto"

// Unit test

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Authenticate Service', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(inMemoryCheckInsRepository) //system under test
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID(),
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})