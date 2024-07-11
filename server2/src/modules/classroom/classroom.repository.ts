import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Classroom } from 'src/entities/classroom.entity';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from '../users/user.repository';
import { StudentClassroom } from 'src/entities/student_classroom.entity';

@Injectable()
export class ClassroomRepository {
  private classroomRepos: Repository<Classroom>;
  private studentClassroomRepos: Repository<StudentClassroom>;
  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    private readonly userRepos: UserRepository,
  ) {
    this.classroomRepos = dataSource.getRepository(Classroom);
    this.studentClassroomRepos = dataSource.getRepository(StudentClassroom);
  }

  async createOne(
    data: Partial<Classroom>,
    user_id: string,
  ): Promise<Classroom> {
    try {
      const user = await this.userRepos.findById(user_id);
      const classroom = new Classroom();
      classroom.name = data.name;
      classroom.teacher = user;

      return await this.classroomRepos.save(classroom);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async addData(
    user_id: string,
    classroom_code: string,
  ): Promise<StudentClassroom> {
    const classroom = await this.classroomRepos.findOneBy({
      classroom_code: classroom_code,
    });
    const user = await this.userRepos.findById(user_id);
    if (!classroom || !user) {
      throw new NotFoundException('Not found data');
    }
    try {
      const studentClassroom = new StudentClassroom();
      studentClassroom.student = user;
      studentClassroom.classroom = classroom;
      return await this.studentClassroomRepos.save(studentClassroom);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async findStudentsById(classroom_id: string) {
    const classroom = await this.classroomRepos.findOneBy({
      classroom_id: classroom_id,
    });
    if (!classroom) {
      throw new NotFoundException('Not found data');
    }
    const student = await this.studentClassroomRepos.find({
      where: { classroom: classroom },
      relations: ['student'],
    });

    const total = student.length;

    return {
      student: student,
      total: total,
    };
  }
}
