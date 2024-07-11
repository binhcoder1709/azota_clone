import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDto } from 'src/dtos/user/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface IUserResponse {
  user_id: string;
  email: string;
  user_name: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async getAllUsersService(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserByIdService(id: string): Promise<IUserResponse> {
    const user = await this.userRepository.findById(id);
    const result: IUserResponse = {
      user_id: user.user_id,
      user_name: user.user_name,
      email: user.email,
    };
    return result;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    const result: IUserResponse = {
      user_id: user.user_id,
      user_name: user.user_name,
      email: user.email,
    };
    return result
  }

  async updateUserService(id: string, dataUpdate: UserDto): Promise<boolean> {
    const result = await this.userRepository.updateOne(id, dataUpdate);
    return !!result
  }

  async updateUserNameService(
    token: string,
    userName: string,
  ): Promise<boolean> {
    const decodePayload = this.jwtService.decode(token);
    const result = await this.userRepository.updateUserName(
      decodePayload.user_id,
      userName,
    );
    return !!result;
  }

  async updatePasswordService(
    token: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const decodePayload = this.jwtService.decode(token);
    const user = await this.userRepository.findById(decodePayload.user_id);
    const comparePassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (comparePassword) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      const result = await this.userRepository.updatePassword(
        decodePayload.user_id,
        newHashedPassword,
      );
      return !!result;
    }
  }

  async deleteUserService(id: string): Promise<boolean> {
    const result = await this.userRepository.deleteOne(id);
    return !!result;
  }
}
