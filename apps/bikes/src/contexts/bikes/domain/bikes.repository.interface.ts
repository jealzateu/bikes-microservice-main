import { Bicycle } from "@prisma/client"
import { BikeDto } from "./bike.dto"

export interface IBikesRepository{
    create(data: BikeDto): Promise<Bicycle>;
    update(data: BikeDto): Promise<Bicycle>;
    findById(id: number): Promise<Bicycle | null>
    findAll(): Promise<Array<Bicycle>>
}