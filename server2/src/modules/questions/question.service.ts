import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { CreateQuestionDto } from 'src/dtos/question/createQuestion.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepos: QuestionRepository) {}

  async createQuestionService(data: CreateQuestionDto) {
    return await this.questionRepos.createOne(data);
  }
}
