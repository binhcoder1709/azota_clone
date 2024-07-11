import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OrmModule } from 'src/configs/typeorm/typeorm.module';
import { UserModule } from '../users/user.module';
import { AnswerRepository } from './answer.repository';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';

@Module({
  imports: [
    OrmModule,
    JwtModule.register({ secret: process.env.ACCESS_SECRET_KEY }),
    UserModule,
  ],
  providers: [AnswerRepository, AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
