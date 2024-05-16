import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { Participant } from './entities/participant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Winner } from 'src/winners/entities/winner.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Participant, User, Winner])],
  controllers: [ParticipantsController],
  providers: [ParticipantsService, UsersService, JwtService],
})
export class ParticipantsModule {}
