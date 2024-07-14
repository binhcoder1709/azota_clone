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
import { CreateQuestionDto } from 'src/dtos/question/createQuestion.dto';

@Controller('/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(TeacherGuard)
  @Post('/create')
  @HttpCode(201)
  async createQuizController(
    @Headers('authorization') header: string,
    @Body() quizDto: CreateQuizDto,
    @Body() questionDto: CreateQuestionDto[],
  ) {
    const tokenSplit = header.split(' ')[1];
    if (!tokenSplit) {
      throw new UnauthorizedException('Token not found');
    }

    // return await this.quizService.createQuizService(
    //   tokenSplit,
    //   quizDto,
    //   questionDto,
    // );
  }
}
