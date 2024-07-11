import { IsDateString, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsDateString()
  start_time: string;

  @IsDateString()
  end_time: string;
}
