import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import { WinnersService } from './winners.service';
import { IsOptional } from "class-validator";

@Controller('winners')
export class WinnersController{
  constructor(private readonly winnersService: WinnersService){}

  @Get()
  async findAll(@Query('limit') limit?: string) {
    return await this.winnersService.findAll(+limit);
  }
}
