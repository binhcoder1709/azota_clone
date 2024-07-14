import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Quiz } from 'src/entities/quiz.entity';
import { CreateAnswerDto } from '../answer/createAnswer.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}
