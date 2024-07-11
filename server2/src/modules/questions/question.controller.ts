import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from 'src/dtos/question/createQuestion.dto';
import { JwtAuthGuard } from 'src/share/guards/auth.guard';
import { TeacherGuard } from 'src/share/guards/teacher.guard';

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(TeacherGuard)
  @Post('/create')
  @HttpCode(201)
  async createQuestionController(@Body() data: CreateQuestionDto) {
    return await this.questionService.createQuestionService(data);
  }
}
