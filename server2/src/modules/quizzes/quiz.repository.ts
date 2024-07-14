import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Quiz } from 'src/entities/quiz.entity';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from '../users/user.repository';
import { Question } from 'src/entities/question.entity';
import { Answer } from 'src/entities/answer.entity';

@Injectable()
export class QuizRepository {
  private quizRepos: Repository<Quiz>;
  private questionRepos: Repository<Question>;
  private answerRepos: Repository<Answer>;
  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    private readonly userRepos: UserRepository,
  ) {
    this.quizRepos = dataSource.getRepository(Quiz);
    this.questionRepos = dataSource.getRepository(Question);
    this.answerRepos = dataSource.getRepository(Answer);
  }

  async createOne(data: Partial<Quiz>): Promise<Quiz> {
    return await this.quizRepos.save(data);
  }

  async createQuestion(data: Partial<Question>) {
    return await this.questionRepos.save(data);
  }

  async createAnswer(data: Partial<Answer[]>) {
    return await this.answerRepos.save(data);
  }

  async findById(quiz_id: string): Promise<Quiz | undefined> {
    const quiz = await this.quizRepos.findOneBy({ quiz_id: quiz_id });
    return quiz;
  }
}
