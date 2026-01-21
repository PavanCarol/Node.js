import { PrismaGymsRepository } from "src/repositories/prisma/prisma-gyms-repository"
import { FetchNearByUserCase } from "../cases/fetch/fetch-nearby-gyms"

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByUserCase(gymsRepository)

  return useCase
}