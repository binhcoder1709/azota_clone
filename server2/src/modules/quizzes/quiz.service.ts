import { Injectable } from '@nestjs/common';
import { QuizRepository } from './quiz.repository';
import { CreateQuizDto } from 'src/dtos/quiz/createQuiz.dto';
import { JwtService } from '@nestjs/jwt';
import { Quiz } from 'src/entities/quiz.entity';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class QuizService {
  constructor(
    private readonly quizRepos: QuizRepository,
    private readonly jwtService: JwtService,
    private readonly userRepos: UserRepository,
  ) {}

  async createQuizService(token: string, data: CreateQuizDto):Promise<Quiz> {
    const payload = this.jwtService.decode(token);

    const user = await this.userRepos.findById(payload.user_id);

    const quiz = new Quiz();
    quiz.title = data.title;
    quiz.start_time = new Date(data.start_time);
    quiz.end_time = new Date(data.end_time);
    quiz.teacher = user;

    return await this.quizRepos.createOne(quiz);
  }
}
