import { response } from 'express';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Winner } from "./entities/winner.entity";
import { Repository } from "typeorm";

@Injectable()
export class WinnersService{
    constructor(
        @InjectRepository(Winner)
        private winnersRepository: Repository<Winner>,
    ){}
    async findAll(limit?: number): Promise<Winner[]> {
      let winners:Winner[]
      if(limit){
        winners = await this.winnersRepository.find({
          order: {
            created_time: "DESC"
          },
          take: +limit
          
        });
      }
      else{
         winners = await this.winnersRepository.find({
          order: {
            created_time: "DESC"
          },          
        });
      }
      
      const formattedImages = winners.map((winner) => ({
        ...winner,
        image_path: `http://localhost:3001/${winner.image_path}`
      }))
  
      return formattedImages;
    }
}