import { PrismaCheckInsRepository } from "src/repositories/prisma/prisma-check-in-repository"
import { PrismaGymsRepository } from "src/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../cases/check-ins/check-in"

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}