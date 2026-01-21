import { PrismaCheckInsRepository } from "src/repositories/prisma/prisma-check-in-repository";
import { GetUserMetricsUseCase } from "../cases/get-users/get-user-metrics";

export function makeGetUserMetricsUseCase(){
    const checkInRepository = new PrismaCheckInsRepository()
    const useCase = new GetUserMetricsUseCase(checkInRepository)

    return useCase
}