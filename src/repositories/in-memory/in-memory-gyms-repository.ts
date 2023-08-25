import { Gym, Prisma, } from "@prisma/client";
import { GymsRepository, findManyNearbyParams } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coodinates";
import { GymWithDistance } from "@/types/gym-with-distance";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find(gym => gym.id === id)

    if(!gym){
      return null
    }
    return gym
  }

  async searchManyByName(name: string, page:number) {
    const gyms = this.items
      .filter(gym => gym.name.includes(name))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findManyNearby(params: findManyNearbyParams) {
    const { latitude, longitude } = params;
  
    const nearbyGymsWithDistance = this.items.map(gym => {
      const distanceInKilometers = getDistanceBetweenCoordinates(
        { latitude, longitude },
        { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
      );
      const gymWithDistance : GymWithDistance = {gym: gym, distanceInKilometers: distanceInKilometers}
      return gymWithDistance;
    }).filter(gym => gym.distanceInKilometers <= 10)
  
    nearbyGymsWithDistance.sort((gymA, gymB) => {
      return gymA.distanceInKilometers - gymB.distanceInKilometers;
    });
  
    return nearbyGymsWithDistance;
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