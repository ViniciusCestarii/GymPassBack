import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymService } from "./create-gym"

// Unit test

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create gym Service', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(inMemoryGymsRepository) //system under test
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      name: 'Academia',
      description: 'Academia de musculação',
      latitude: 0,
      longitude: 0,
      phone: '123456789',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})