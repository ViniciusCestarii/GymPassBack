
import { Gym } from "@prisma/client";
export type GymWithDistance = {
  gym: Gym;
  distanceInKilometers: number;
}