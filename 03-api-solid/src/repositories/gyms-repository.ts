import { Gym, Prisma } from "@prisma/client";

export interface findManyNearByParam{
   latitude: number;
   longitude: number
}
export interface GymRepository{
   create(data: Prisma.GymCreateInput):Promise<Gym>
   findById(id:string):Promise<Gym | null>
   searchManyByTitle(query:string,page:number):Promise<Gym[]>
   findManyNearBy( params: findManyNearByParam ):Promise<Gym[]>
}