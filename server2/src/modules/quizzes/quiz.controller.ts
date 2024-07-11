import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from 'src/dtos/quiz/createQuiz.dto';
import { TeacherGuard } from 'src/share/guards/teacher.guard';
import { JwtAuthGuard } from 'src/share/guards/auth.guard';

@Controller('/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(TeacherGuard)
  @Post('/create')
  @HttpCode(201)
  async createQuizController(
    @Headers('authorization') header: string,
    @Body() data: CreateQuizDto,
  ) {
    const tokenSplit = header.split(' ')[1];
    if (!tokenSplit) {
      throw new UnauthorizedException('Token not found');
    }

    return await this.quizService.createQuizService(tokenSplit, data);
  }
}
