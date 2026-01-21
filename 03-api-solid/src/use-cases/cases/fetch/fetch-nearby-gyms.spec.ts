 
import { InMemoryGymRepository } from '../../../repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe,expect,it } from 'vitest'
import { FetchNearByUserCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymRepository
let sut: FetchNearByUserCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new FetchNearByUserCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.6785265,
      longitude: -46.5461471,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })


    const { gyms } = await sut.execute({
        userLatitude:-23.6785265,
        userLongitude: -46.5461471,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([ expect.objectContaining({ title: 'Near Gym' }) 
    ])
  })
})