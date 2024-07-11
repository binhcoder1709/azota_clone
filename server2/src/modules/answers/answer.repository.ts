import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAnswerDto } from 'src/dtos/answer/createAnswer.dto';
import { Answer } from 'src/entities/answer.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AnswerRepository {
  private answerRepos: Repository<Answer>;
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.answerRepos = dataSource.getRepository(Answer);
  }

  async createOne(data: CreateAnswerDto) {
    try {
      const answer = new Answer();
      answer.text = data.text;
      answer.is_correct = data.is_correct;
      answer.question = data.question;

      return await this.answerRepos.save(answer);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
