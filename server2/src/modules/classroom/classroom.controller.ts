import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from 'src/dtos/classroom/createClassroom.dto';
import { TeacherGuard } from 'src/share/guards/teacher.guard';
import { StudentGuard } from 'src/share/guards/student.guard';
import { JwtAuthGuard } from 'src/share/guards/auth.guard';

@Controller('/classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(TeacherGuard)
  @Post('/create')
  @HttpCode(201)
  async createClassroomController(
    @Headers('authorization') header: string,
    @Body() data: CreateClassroomDto,
  ) {
    const tokenSplit = header.split(' ')[1];
    if (!tokenSplit) {
      throw new UnauthorizedException('Token not found');
    }

    return await this.classroomService.createClassService(tokenSplit, data);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(StudentGuard)
  @Post('/add-student')
  @HttpCode(201)
  async addStudentToClassroomController(
    @Headers('authorization') header: string,
    @Body('classroom_code') classroomCode: string,
  ) {
    const tokenSplit = header.split(' ')[1];
    if (!tokenSplit) {
      throw new UnauthorizedException('Token not found');
    }

    return await this.classroomService.addStudentToClassroomService(
      tokenSplit,
      classroomCode,
    );
  }

  @Get('/:id')
  @HttpCode(200)
  async getStudentsController(@Param('id') id: string) {
    return await this.classroomService.getStudentsFromClassroomService(id);
  }
}
