import { OrmModule } from 'src/configs/typeorm/typeorm.module';
import { QuizController } from './quiz.controller';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { ClassroomModule } from '../classroom/classroom.module';

@Module({
  imports: [
    OrmModule,
    JwtModule.register({ secret: process.env.ACCESS_SECRET_KEY }),
    forwardRef(() => UserModule),
    ClassroomModule,
  ],
  providers: [QuizRepository, QuizService],
  controllers: [QuizController],
  exports: [QuizRepository]
})
export class QuizModule {}
