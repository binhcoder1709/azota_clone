import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateQuestionDto } from 'src/dtos/question/createQuestion.dto';
import { Question } from 'src/entities/question.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionRepository {
  private questionRepos: Repository<Question>;
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.questionRepos = dataSource.getRepository(Question);
  }

  async createOne(data: CreateQuestionDto) {
    try {
      const question = new Question();
      question.text = data.text;
      question.quiz = data.quiz;

      return await this.questionRepos.save(question);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
