import { Gym } from "@prisma/client";
import { GymRepository } from "src/repositories/gyms-repository";

interface FetchNearByUserCaseRequest{
    userLatitude: number
    userLongitude: number
}

interface  FetchNearByUserCaseResponse{
    gyms:Gym[]
}

export class FetchNearByUserCase{
    constructor( 
        private gymsRepository: GymRepository
    ){}

    async execute({
       userLatitude,
       userLongitude
    }:FetchNearByUserCaseRequest): Promise<FetchNearByUserCaseResponse>{
        const gyms = await this.gymsRepository.findManyNearBy(
            {
                latitude: userLatitude,
                longitude:userLongitude
            }
        )

        return{
            gyms
        }
    }
}