import { hash } from 'bcryptjs'
import { UsersRepository } from "src/repositories/users-repository"
import { User } from "@prisma/client"
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'

interface RegisterUseCaseRequest{
    name:string,
    email:string,
    password: string
}

interface RegisterUseCaseResponse{
    user: User
}
//SOLID 

//D - Dependency Invertion Principle
export class RegisterUseCase{

    constructor( private usersRepository: UsersRepository){}

    async execute({
        name,
        email,
        password
    }:RegisterUseCaseRequest):
    Promise<RegisterUseCaseResponse>{
        const password_hash = await hash( password, 6)
        const useWithSameEmail = await this.usersRepository.findByEmail(email)
    
        if(useWithSameEmail){
            throw new UserAlreadyExistsError()
        }
    
        //caso de uso
        //const prismaUsersRepositor = new PrismaUsersRepository()
        const user = await this.usersRepository.create({
                name,
                email,
                password_hash: password_hash,
        })

        return {
            user,
        }
    }
}
