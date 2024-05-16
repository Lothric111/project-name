// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Winner } from './entities/winner.entity';
import { WinnersController } from './winners.controller';
import { WinnersService } from './winners.service';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Winner])],
    controllers: [WinnersController],
    providers: [WinnersService],
})
export class WinnersModule {}
