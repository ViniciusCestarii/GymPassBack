import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsServiceService } from "./fetch-nearby-gyms"

// Unit test

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsServiceService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsServiceService(inMemoryGymsRepository) //system under test
  })

  it('should be able to fetch nearby gyms', async () => {

    await inMemoryGymsRepository.create({
      name: 'first nearby gym',
      description: 'Academia de musculação',
      latitude: -27.078174940553247,
      longitude: -48.93295612147477,
    })

    await inMemoryGymsRepository.create({
      name: 'second nearby gym',
      description: 'Academia de musculação',
      latitude: -27.078174940553246,
      longitude: -48.93295612147472,
    })

    await inMemoryGymsRepository.create({
      name: 'far gym',
      description: 'Academia de musculação',
      latitude: -24.078174940553246,
      longitude: -49.93295612147472,
    })


    const { gymsWithDistance } = await sut.execute({ userLatitude: -27.078174940553247, userLongitude: -48.93295612147477})

    expect(gymsWithDistance).toHaveLength(2)
    expect(gymsWithDistance).toEqual([
      expect.objectContaining({ gym: expect.objectContaining({ name: 'first nearby gym' })}),
      expect.objectContaining({ gym: expect.objectContaining({ name: 'second nearby gym' })}),
    ])
  })

  it('should be able to fetch nearby gyms and order from the nearest to the farthest', async () => {

    await inMemoryGymsRepository.create({
      name: 'second nearby gym',
      description: 'Academia de musculação',
      latitude: -27.100161689142883,
      longitude: -48.93053119511086,
    }),

    await inMemoryGymsRepository.create({
      name: 'first nearby gym',
      description: 'Academia de musculação',
      latitude: -27.078174940553247,
      longitude: -48.93295612147477,
    })

    await inMemoryGymsRepository.create({
      name: 'far gym',
      description: 'Academia de musculação',
      latitude: -24.078174940553246,
      longitude: -49.93295612147472,
    })

    const { gymsWithDistance } = await sut.execute({ userLatitude: -27.078174940553247, userLongitude: -48.93295612147477})

    expect(gymsWithDistance).toHaveLength(2)
    expect(gymsWithDistance).toEqual([
      expect.objectContaining({ gym: expect.objectContaining({ name: 'first nearby gym' })}),
      expect.objectContaining({ gym: expect.objectContaining({ name: 'second nearby gym' })}),
    ])
  })
})