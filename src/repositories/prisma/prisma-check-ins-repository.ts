import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";

export class PrismaUsersRepository implements CheckInsRepository {
  async create(data : Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    })

    return checkIn
  }
}