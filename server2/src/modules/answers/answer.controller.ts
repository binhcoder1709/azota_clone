import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from 'src/dtos/answer/createAnswer.dto';
import { JwtAuthGuard } from 'src/share/guards/auth.guard';
import { TeacherGuard } from 'src/share/guards/teacher.guard';

@Controller('/answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(TeacherGuard)
  @Post('/create')
  @HttpCode(201)
  async createAnswerController(@Body() data: CreateAnswerDto) {
    return await this.answerService.createAnswerService(data);
  }
}
