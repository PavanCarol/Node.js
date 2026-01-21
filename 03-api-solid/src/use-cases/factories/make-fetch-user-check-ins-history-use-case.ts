import { PrismaCheckInsRepository } from "src/repositories/prisma/prisma-check-in-repository"
import { FetchUserCase } from "../cases/fetch/fetch-user-check-in-history"

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCase(checkInsRepository)

  return useCase
}