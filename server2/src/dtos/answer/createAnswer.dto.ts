import { IsBoolean, IsString } from 'class-validator';
import { Question } from 'src/entities/question.entity';

export class CreateAnswerDto {
  @IsString()
  text: string;

  @IsBoolean()
  is_correct: boolean;

  @IsString()
  question: Question;
}
