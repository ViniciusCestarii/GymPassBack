import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";
import { GymsRepository, findManyNearbyParams } from "../gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coodinates";
import { GymWithDistance } from "@/types/gym-with-distance";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data
    })

    return gym
  }
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    })

    return gym
  }
  async searchManyByName(name: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        name: {
          contains: name
        }
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
  async findManyNearby({ latitude, longitude }: findManyNearbyParams) {

    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    const nearbyGymsWithDistance = gyms.map(gym => {
      const distanceInKilometers = getDistanceBetweenCoordinates(
        { latitude, longitude },
        { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
      );
      const gymWithDistance: GymWithDistance = { gym: gym, distanceInKilometers: distanceInKilometers }
      return gymWithDistance;
    }).filter(gym => gym.distanceInKilometers <= 10)

    nearbyGymsWithDistance.sort((gymA, gymB) => {
      return gymA.distanceInKilometers - gymB.distanceInKilometers;
    });

    return nearbyGymsWithDistance;
  }
}