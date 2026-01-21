import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "src/repositories/check-ins-repository";

interface FetchUserCaseRequest{
    userId:string
    page:number
}

interface  FetchUserCaseResponse{
    checkIns:CheckIn[]
}

export class FetchUserCase{
    constructor( 
        private checkInsRepository: CheckInsRepository
    ){}

    async execute({
        userId,
        page
    }:FetchUserCaseRequest): Promise<FetchUserCaseResponse>{
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return{
            checkIns
        }
    }
}