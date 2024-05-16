import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Query, Req, ParseIntPipe } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { multerOptions } from './multer/config';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';


@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}
  
  @Post()
  @UseInterceptors(FileInterceptor('image_path', multerOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createParticipantDto: CreateParticipantDto
  ) {
    return await this.participantsService.create(createParticipantDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.participantsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantsService.update(+id, updateParticipantDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tirage')
  async drawWinners(
    @Req() req: Request,
    @Query('count', ParseIntPipe) count: number
  ) {
    const token = req?.cookies?.token       

    return await this.participantsService.drawWinners(token, count);
  }
}
 