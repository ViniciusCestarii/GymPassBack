import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { CheckInService } from "./check-in"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"

// Unit test

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Authenticate Service', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(inMemoryCheckInsRepository, gymsRepository) //system under test

    gymsRepository.items.push({
      id: 'gymID',
      name: 'Gym Name',
      latitude: new Decimal(-27.0989713),
      longitude: new Decimal(-48.9233523),
      createdAt: new Date(),
      description: 'Gym Description',
      phone: '123456789',
      updatedAt: new Date(),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymID',
      userId: 'gymID',
      userLatitude: -27.0989714,
      userLongitude: -48.9233522,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gymID',
      userId: "userID",
      userLatitude: -27.0989714,
      userLongitude: -48.9233522,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gymID',
        userId: "userID",
        userLatitude: -27.0989714,
        userLongitude: -48.9233522,
      })).rejects.toBeInstanceOf(Error)

  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gymID',
      userId: "userID",
      userLatitude: -27.0989714,
      userLongitude: -48.9233522,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))


    const { checkIn } = await sut.execute({
      gymId: 'gymID',
      userId: "userID",
      userLatitude: -27.0989714,
      userLongitude: -48.9233522,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {

    gymsRepository.items.push({
      id: 'gymID2',
      name: 'Gym Name',
      latitude: new Decimal(-27.0960687165202),
      longitude: new Decimal(-48.91592462611356),
      createdAt: new Date(),
      description: 'Gym Description',
      phone: '123456789',
      updatedAt: new Date(),
    })

    await expect(() => sut.execute({
      gymId: 'gymID2',
      userId: 'gymID',
      userLatitude: -27.0989714,
      userLongitude: -48.9233522,
    })).rejects.toBeInstanceOf(Error)
  })
})