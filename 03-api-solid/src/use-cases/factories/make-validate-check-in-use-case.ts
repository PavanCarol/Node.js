import { PrismaCheckInsRepository } from "src/repositories/prisma/prisma-check-in-repository";
import { ValidateCheckInUseCase } from "../cases/validate/validate-check-in";

export function makeValidateCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new ValidateCheckInUseCase(checkInsRepository)

    return useCase
}