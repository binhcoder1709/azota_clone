import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDto } from 'src/dtos/user/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { QuizRepository } from '../quizzes/quiz.repository';
import { StudentQuiz } from 'src/entities/student_quiz.entity';
import { AddToQuizDto } from 'src/dtos/user/addToQuiz.dto';

export interface IUserResponse {
  user_id: string;
  email: string;
  user_name: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly quizRepos: QuizRepository,
  ) {}
  async getAllUsersService(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserByIdService(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return user;
  }

  async updateUserService(
    id: string,
    dataUpdate: UserDto,
  ): Promise<UpdateResult> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    try {
      const result = await this.userRepository.updateOne(id, dataUpdate);
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async updateUserNameService(
    token: string,
    userName: string,
  ): Promise<UpdateResult> {
    const decodePayload = this.jwtService.decode(token);
    const user = await this.userRepository.findById(decodePayload.user_id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    try {
      const result = await this.userRepository.updateUserName(
        decodePayload.user_id,
        userName,
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async updatePasswordService(
    token: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<UpdateResult> {
    const decodePayload = this.jwtService.decode(token);
    const user = await this.userRepository.findById(decodePayload.user_id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    const comparePassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!comparePassword) {
      throw new UnauthorizedException('Password invalid');
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    try {
      const result = await this.userRepository.updatePassword(
        decodePayload.user_id,
        newHashedPassword,
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async deleteUserService(id: string): Promise<DeleteResult> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    try {
      const result = await this.userRepository.deleteOne(id);
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async addToQuizService(
    token: string,
    quiz_id: string,
    data: AddToQuizDto,
  ): Promise<StudentQuiz> {
    const decodePayload = this.jwtService.decode(token);
    const quiz = await this.quizRepos.findById(quiz_id);
    if (!quiz) {
      throw new NotFoundException('Not found quiz');
    }
    const student = await this.userRepository.findById(decodePayload.user_id);
    if (!student) {
      throw new NotFoundException('Not found student');
    }
    try {
      const studentQuiz = new StudentQuiz();
      studentQuiz.start_time = new Date(data.start_time);
      studentQuiz.end_time = new Date(data.end_time);
      studentQuiz.quiz = quiz;
      studentQuiz.student = student;
      return await this.userRepository.addToQuiz(studentQuiz);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getAllClassesByTeacherService(token: string) {
    const decodePayload = this.jwtService.decode(token);
    const user = await this.userRepository.findById(decodePayload.user_id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return await this.userRepository.findClassesByTeacher(
      decodePayload.user_id,
    );
  }

  async getAllClassesByStudentService(token: string) {
    const decodePayload = this.jwtService.decode(token);
    const user = await this.userRepository.findById(decodePayload.user_id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return await this.userRepository.findClassesByStudent(user);
  }
}
