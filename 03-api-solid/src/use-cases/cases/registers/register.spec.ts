 
import { beforeEach, describe,expect,it } from 'vitest'

import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'

//Unit Test

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case',() => {

    beforeEach(() =>{
        usersRepository = new InMemoryUsersRepository() 
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () => {

        const { user } = await sut.execute({
            name:'Joeh Jon',
            email: 'john@exampl.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        //Teste de integração
        // const prismaUsersRepository = new PrismaUsersRepository()


        const { user } = await sut.execute({
            name:'Joeh Jon',
            email: 'john@exampl.com',
            password: '123456'
        })

        console.log(user.password_hash)

        const isPasswordCorrectlyHashed = await compare(
           '123456',
           user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

     it('should not be able to registr with same email twice', async () => {

        const email = 'carol.pavan@exampl.com'

        await sut.execute({
            name:'Joeh Jon',
            email,
            password: '123456'
        })

        //Resolve / Reject
        await expect(() => 
        sut.execute({
            name:'Joeh Jon',
            email,
            password: '123456'
        }),
        ).rejects.toBeInstanceOf( UserAlreadyExistsError )
    })
})