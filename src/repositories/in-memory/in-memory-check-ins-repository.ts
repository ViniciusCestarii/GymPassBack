import { CheckIn, Prisma, User } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

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
}