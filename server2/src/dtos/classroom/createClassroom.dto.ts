import { IsString } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateClassroomDto {
  @IsString()
  name: string;
}
