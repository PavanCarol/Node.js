import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from 'src/use-cases/cases/authentications/authenticate'
import { InvalidCredentialsError } from 'src/use-cases/errors/invalid-credentials-error'
import { z } from "zod"

export async function authenticate( request: FastifyRequest, reply:FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email,password } = authenticateBodySchema.parse(request.body)

    try{
        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

        const { user } = await authenticateUseCase.execute({
            email,
            password,
        })

        const token = await reply.jwtSign(
            {
                role: user.role
            }, 
            {
                sign:{
                    sub: user.id
                },
            },
        )

        const refreshtoken = await reply.jwtSign(
            {
                role: user.role
            }, 
            {
                sign:{
                    sub: user.id,
                    expiresIn: '7d'
                },
            },
        )
        
        return reply
        .setCookie('refreshToken', refreshtoken, {
            path:'/',
            secure:true,
            sameSite: true,
            httpOnly: true
        })
        .status(200)
        .send({
            token,
        })

    }catch(err){
        if(err instanceof InvalidCredentialsError){
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }

    
}