import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParticipantsModule } from './participants/participants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { WinnersModule } from './winners/winners.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig), 
    ParticipantsModule,
    AuthModule,
    UsersModule,
    WinnersModule,
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads')
  })
],
  controllers: [AppController],
  providers: [AppService, JwtModule],
})
export class AppModule {}
