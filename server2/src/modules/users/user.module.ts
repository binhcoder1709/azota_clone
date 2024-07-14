import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { OrmModule } from 'src/configs/typeorm/typeorm.module';
import { JwtModule } from '@nestjs/jwt';
import { QuizModule } from '../quizzes/quiz.module';

@Module({
  imports: [
    OrmModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET_KEY,
    }),
    forwardRef(()=> QuizModule)
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
