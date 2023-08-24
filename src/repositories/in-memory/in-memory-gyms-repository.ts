import { Gym, Prisma, } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find(gym => gym.id === id)

    if(!gym){
      return null
    }
    return gym
  }

  async findManyByName(name: string, page:number): Promise<Gym[]> {
    const gyms = this.items
      .filter(gym => gym.name.includes(name))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym : Gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      phone: data.phone ?? null,
      description: data.description ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.items.push(gym)

    return gym
  }
}