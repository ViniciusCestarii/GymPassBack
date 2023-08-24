import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { SearchGymService } from "./search-gyms"

// Unit test

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymService

describe('Serach Gyms Service', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymService(inMemoryGymsRepository) //system under test
  })

  it('should be able to search many gyms by name', async () => {

    await inMemoryGymsRepository.create({
      name: 'Dont have the name searched',
      description: 'Academia de musculação',
      latitude: 0,
      longitude: 0,
    })

    await inMemoryGymsRepository.create({
      name: 'gym',
      description: 'Academia de musculação',
      latitude: 0,
      longitude: 0,
    })

    await inMemoryGymsRepository.create({
      name: 'Super gym',
      description: 'Academia de musculação',
      latitude: 0,
      longitude: 0,
    })


    const { gyms } = await sut.execute({ name: 'gym', page: 1 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'gym' }),
      expect.objectContaining({ name: 'Super gym' })
    ])
  })

  it('should be able to fetch paginated gyms search by name', async () => {

    await inMemoryGymsRepository.create({
      name: 'Dont have the name searched',
      description: 'Academia de musculação',
      latitude: 0,
      longitude: 0,
    })

    for (let i = 1; i <= 23; i++) {
      await inMemoryGymsRepository.create({
        name: `gym${i}`,
        description: 'Academia de musculação',
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({ name: 'gym', page: 2 })

    expect(gyms).toHaveLength(3)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'gym21' }),
      expect.objectContaining({ name: 'gym22' }),
      expect.objectContaining({ name: 'gym23' })
    ])
  })
})