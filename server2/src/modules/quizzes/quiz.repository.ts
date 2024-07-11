import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Quiz } from 'src/entities/quiz.entity';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class QuizRepository {
  private quizRepos: Repository<Quiz>;
  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    private readonly userRepos: UserRepository,
  ) {
    this.quizRepos = dataSource.getRepository(Quiz);
  }

  async createOne(data: Partial<Quiz>):Promise<Quiz> {
    try {
      return await this.quizRepos.save(data);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
