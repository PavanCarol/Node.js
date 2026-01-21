import { UsersRepository } from "src/repositories/users-repository";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest{
    email:string
    password:string
}

interface  AuthenticaeUseCaseResponse{
    user:User
}

//retorno de caso de uso
export class AuthenticateUseCase{
    constructor(
        private usersRepository:UsersRepository,
    ){}

    async execute({
        email,
        password
    }:AuthenticateUseCaseRequest): Promise<AuthenticaeUseCaseResponse>{
        // buscar o usuário no banco pelo e-mail
        // comparar se a senha no banco bate com a senha do param
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return{
            user,
        }
    }
}