import { CheckIn, Prisma, User } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date){
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find(checkIn => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnTheSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
      
      return checkIn.userId === userId && isOnTheSameDate
    })

    if(!checkInOnSameDate){
      return null
    }

    return checkInOnSameDate
  }

  async findById(id: string) {
    const checkIn = this.items.find(checkIn => checkIn.id === id)

    if(!checkIn){
      return null
    }

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter(checkIn => checkIn.userId === userId)
      .slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async countByUserId(userId: string) {
    const checkInsCount = this.items
      .filter(checkIn => checkIn.userId === userId)
      .length

    return checkInsCount
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn : CheckIn = {
      id: randomUUID(),
      createdAt: new Date(),
      gymId: data.gymId,
      userId: data.userId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
    }
    this.items.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

    if(checkInIndex >= 0){
    this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}