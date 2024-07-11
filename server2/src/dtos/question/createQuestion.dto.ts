import { IsString } from 'class-validator';
import { Quiz } from 'src/entities/quiz.entity';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsString()
  quiz: Quiz;
}
