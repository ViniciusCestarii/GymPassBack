import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { CheckInService } from "./check-in"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"
import { MaxDistanceError } from "./errors/max-distance-error"
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error"

// Unit test

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(inMemoryCheckInsRepository, gymsRepository) //system under test

    await gymsRepository.create({
      id: 'gymID',
      name: 'Academia',
      description: 'Academia de musculação',
      latitude: -27.0989713,
      longitude: -48.9233522,
      phone: '123456789',
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
      })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)

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

    await gymsRepository.create({
      id: 'gymID2',
      name: 'Gym Name',
      latitude: -57.0960687165202,
      longitude:-18.91592462611356,
      description: 'Gym Description',
      phone: '123456789',
    })

    await expect(() => sut.execute({
      gymId: 'gymID2',
      userId: 'gymID',
      userLatitude: -27.0989714,
      userLongitude: -48.9233522,
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })
})