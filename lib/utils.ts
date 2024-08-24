import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

/**
 * Formula to calculate the maximum number of nuts that can be transported into town
 * @param kmPerTrip D - the town is D km away from the pile
 * @param nutsInKg N - the pile contains N kg of nuts
 * @param nutsPerKmInKg F - the horse consumes F kg of nuts per km traveled
 * @param carryCapacityInKg C - The cart can carry at most C kg of nuts
 * @return X -the maximum number of nuts that can be transported
 */
export const getMaxNuts = (kmPerTrip: number, nutsInKg: number, nutsPerKmInKg: number, carryCapacityInKg: number): number => {
  // If we can carry them all, do so
  if (nutsInKg <= carryCapacityInKg) {
    return Math.max((nutsInKg - kmPerTrip * nutsPerKmInKg), 0);
  }

  const unidirectionalTrips = Math.ceil(nutsInKg / carryCapacityInKg);
  // The trip works 2 ways except for last one
  const numTrips = 2 * unidirectionalTrips - 1;
  const costPerKm = numTrips * nutsPerKmInKg;
  const remainingNutsInKg = carryCapacityInKg * (unidirectionalTrips - 1);
  const traveled = (nutsInKg - remainingNutsInKg) / costPerKm;

  if (traveled >= kmPerTrip) {
    return nutsInKg - kmPerTrip * costPerKm;
  }

  return getMaxNuts(kmPerTrip - traveled, remainingNutsInKg, nutsPerKmInKg, carryCapacityInKg);
}
