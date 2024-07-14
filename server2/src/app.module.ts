import { Module } from '@nestjs/common';
import { OrmModule } from './configs/typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { ClassroomModule } from './modules/classroom/classroom.module';
import { QuizModule } from './modules/quizzes/quiz.module';

@Module({
  imports: [
    OrmModule,
    AuthModule,
    UserModule,
    ClassroomModule,
    QuizModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ],
})
export class AppModule {}
