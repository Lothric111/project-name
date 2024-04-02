import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParticipantsModule } from './participants/participants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(join(__dirname, '..', 'uploads'));
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ParticipantsModule,ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads')
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
