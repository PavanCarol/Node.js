 
import { beforeEach, describe,expect,it } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymRepository } from '../../../repositories/in-memory/in-memory-gyms-repository'


let GymsRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case',() => {

    beforeEach(() =>{
        GymsRepository = new InMemoryGymRepository() 
        sut = new CreateGymUseCase(GymsRepository)
    })

    it('should be able to register', async () => {

        const { gym } = await sut.execute({
           title: 'JavaScript',
           description:null,
           phone:null,
           latitude: -23.6785265,
           longitude:-46.5461471,
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})