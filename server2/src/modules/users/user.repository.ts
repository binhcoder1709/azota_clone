import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AddToQuizDto } from 'src/dtos/user/addToQuiz.dto';
import { UserDto } from 'src/dtos/user/user.dto';
import { User } from 'src/entities/user.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QuizRepository } from '../quizzes/quiz.repository';
import { StudentQuiz } from 'src/entities/student_quiz.entity';
import { StudentClassroom } from 'src/entities/student_classroom.entity';

@Injectable()
export class UserRepository {
  private userRepos: Repository<User>;
  private studentQuizRepos: Repository<StudentQuiz>;
  private studentClassroomRepos: Repository<StudentClassroom>;
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.userRepos = dataSource.getRepository(User);
    this.studentQuizRepos = dataSource.getRepository(StudentQuiz);
    this.studentClassroomRepos = dataSource.getRepository(StudentClassroom);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepos.find();
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.userRepos.findOneBy({ user_id: id });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepos.findOneBy({ email: email });
  }

  async createOne(data: Partial<User>): Promise<User> {
    return await this.userRepos.save(data);
  }

  async updateOne(
    id: string,
    userDto: UserDto,
  ): Promise<UpdateResult | undefined> {
    return await this.userRepos.update({ user_id: id }, userDto);
  }

  async updateUserName(
    id: string,
    userName: string,
  ): Promise<UpdateResult | undefined> {
    return await this.userRepos.update(
      { user_id: id },
      { user_name: userName },
    );
  }

  async updatePassword(
    id: string,
    password: string,
  ): Promise<UpdateResult | undefined> {
    return await this.userRepos.update({ user_id: id }, { password: password });
  }

  async deleteOne(id: string): Promise<DeleteResult | undefined> {
    return await this.userRepos.delete(id);
  }

  async addToQuiz(data: Partial<StudentQuiz>): Promise<StudentQuiz> {
    return await this.studentQuizRepos.save(data);
  }

  async findClassesByTeacher(teacher_id: string) {
    const teacher = await this.userRepos.findOne({
      where: { user_id: teacher_id },
      relations: ['classrooms'],
    });
    const classroom = teacher.classrooms;
    const totalClassroom = classroom.length;
    return {
      classrooms: classroom,
      totalClassroom: totalClassroom,
    };
  }

  async findClassesByStudent(student: User) {
    const studentClass = await this.studentClassroomRepos.find({
      where: { student: student },
      relations: ['classroom'],
    });
    const classroom = studentClass.map((item) => item.classroom);
    return classroom;
  }
}
