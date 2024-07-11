import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClassroomRepository } from './classroom.repository';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { UserModule } from '../users/user.module';
import { OrmModule } from 'src/configs/typeorm/typeorm.module';

@Module({
  imports: [
    OrmModule,
    JwtModule.register({ secret: process.env.ACCESS_SECRET_KEY }),
    UserModule,
  ],
  providers: [ClassroomRepository, ClassroomService],
  controllers: [ClassroomController],
})
export class ClassroomModule {}
