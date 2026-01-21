import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../cases/authentications/authenticate";

export function makeAuthenticateUseCase(){
    const UsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(UsersRepository)

    return authenticateUseCase
}