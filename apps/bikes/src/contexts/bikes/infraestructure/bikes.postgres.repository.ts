import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Bicycle } from '@prisma/client';
import { IBikesRepository } from "../domain/bikes.repository.interface";
import { BikeDto } from "../domain/bike.dto";

@Injectable()
export class BikesRepository implements IBikesRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: BikeDto): Promise<Bicycle> {
        return this.prisma.bicycle.create({data});
    }

    async findById(id: number): Promise<Bicycle> {
        return this.prisma.bicycle.findUnique({where: {id}});
    }

    async findAll(): Promise<Array<Bicycle>> {
        return this.prisma.bicycle.findMany();
    }

    async update(data: BikeDto): Promise<Bicycle> {
        return await this.prisma.bicycle.update({
            where: { id: data.id },
            data
        });
    }
}