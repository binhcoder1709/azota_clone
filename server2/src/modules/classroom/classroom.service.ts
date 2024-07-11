import { Injectable } from '@nestjs/common';
import { ClassroomRepository } from './classroom.repository';
import { CreateClassroomDto } from 'src/dtos/classroom/createClassroom.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClassroomService {
  constructor(
    private readonly classroomRepos: ClassroomRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createClassService(token: string, data: CreateClassroomDto) {
    const payloadToken = await this.jwtService.decode(token);
    return await this.classroomRepos.createOne(data, payloadToken.user_id);
  }

  async addStudentToClassroomService(token: string, classroomCode: string) {
    const payloadToken = await this.jwtService.decode(token);
    return await this.classroomRepos.addData(
      payloadToken.user_id,
      classroomCode,
    );
  }

  async getStudentsFromClassroomService(classroom_id: string) {
    return await this.classroomRepos.findStudentsById(classroom_id);
  }
}
