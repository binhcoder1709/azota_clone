import { OrmModule } from 'src/configs/typeorm/typeorm.module';
import { QuizController } from './quiz.controller';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    OrmModule,
    JwtModule.register({ secret: process.env.ACCESS_SECRET_KEY }),
    UserModule,
  ],
  providers: [QuizRepository, QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
