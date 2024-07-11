import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OrmModule } from 'src/configs/typeorm/typeorm.module';
import { QuestionRepository } from './question.repository';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    OrmModule,
    JwtModule.register({ secret: process.env.ACCESS_SECRET_KEY }),
    UserModule,
  ],
  providers: [QuestionRepository, QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
