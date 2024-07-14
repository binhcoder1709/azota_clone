import { IsDateString } from 'class-validator';

export class AddToQuizDto {
  @IsDateString()
  start_time: string;

  @IsDateString()
  end_time: string;
}
