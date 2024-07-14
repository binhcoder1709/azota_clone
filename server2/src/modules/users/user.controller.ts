import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { IUserResponse, UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { DeleteResult } from 'typeorm';
import { UserDto } from 'src/dtos/user/user.dto';
import { JwtAuthGuard } from 'src/share/guards/auth.guard';
import { RoleGuard } from 'src/share/guards/role.guard';
import { ManagerGuard } from 'src/share/guards/manager.guard';
import { TeacherGuard } from 'src/share/guards/teacher.guard';
import { StudentGuard } from 'src/share/guards/student.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard)
  @Get('/')
  @HttpCode(200)
  async getAllUsersController(): Promise<User[]> {
    return await this.userService.getAllUsersService();
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard)
  @Get('/:id')
  @HttpCode(200)
  async getUserByIdController(@Param('id') id: string): Promise<IUserResponse> {
    return await this.userService.getUserByIdService(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Put('/:id')
  @HttpCode(200)
  async updateUserController(
    @Body() userDto: UserDto,
    @Param('id') id: string,
  ) {
    return await this.userService.updateUserService(id, userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/user-name')
  @HttpCode(200)
  async updateUserNameController(
    @Headers('authorization') header: string,
    @Body('user_name') userName: string,
  ) {
    const tokenSplit = header.split(' ')[1];
    if (!tokenSplit) {
      throw new UnauthorizedException('Missing token');
    } else {
      return await this.userService.updateUserNameService(tokenSplit, userName);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/password')
  @HttpCode(200)
  async updatePasswordController(
    @Headers('authorization') header: string,
    @Body('current_password') currentPassword: string,
    @Body('new_password') newPassword: string,
  ) {
    const tokenSplit = header.split(' ')[1];
    if (!tokenSplit) {
      throw new UnauthorizedException('Missing token');
    } else {
      return await this.userService.updatePasswordService(
        tokenSplit,
        currentPassword,
        newPassword,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ManagerGuard)
  @Delete('/:id')
  @HttpCode(200)
  async deleteUserController(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.deleteUserService(id);
  }

  async addToQuizController(
    @Headers('authorization') header: string,
    @Param('quiz_id') quiz_id: string,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(TeacherGuard)
  @Get('/teacher/classroom')
  @HttpCode(200)
  async getAllClassesByTeacherController(
    @Headers('authorization') header: string,
  ) {
    const tokenSplit = header.split(' ')[1];
    if (!tokenSplit) {
      throw new UnauthorizedException('Missing token');
    } else {
      return await this.userService.getAllClassesByTeacherService(tokenSplit);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(StudentGuard)
  @Get('/student/classroom')
  @HttpCode(200)
  async getAllClassesByStudentController(
    @Headers('authorization') header: string,
  ) {
    const tokenSplit = header.split(' ')[1];
    if (!tokenSplit) {
      throw new UnauthorizedException('Missing token');
    } else {
      return await this.userService.getAllClassesByStudentService(tokenSplit);
    }
  }
}
