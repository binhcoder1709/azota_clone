import { Injectable } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { CreateAnswerDto } from 'src/dtos/answer/createAnswer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly answerRepos: AnswerRepository) {}

  async createAnswerService(data: CreateAnswerDto) {
    return await this.answerRepos.createOne(data);
  }
}
