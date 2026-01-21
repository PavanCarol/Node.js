import { PrismaGymsRepository } from "src/repositories/prisma/prisma-gyms-repository"
import { SearchGymUseCase } from "../cases/search-gyms/search-gyms"

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}