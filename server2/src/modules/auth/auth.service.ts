import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { RegisterDto } from 'src/dtos/auth/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dtos/auth/login.dto';
import { IUserResponse, UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';

interface PayloadToken {
  user_id: string;
  user_name: string;
  email: string;
  avatar: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepos: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async addUserService(registerDto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const createdUser = {
        ...registerDto,
        password: hashedPassword,
      };
      const dataCreated = await this.userRepos.createOne(createdUser);
      const dataReturn: IUserResponse = {
        user_id: dataCreated.user_id,
        user_name: dataCreated.user_name,
        email: dataCreated.email,
      };
      return {
        message: 'Account create successfully',
        data: dataReturn,
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async loginService(loginDto: LoginDto) {
    try {
      const userWithEmail = await this.userRepos.findByEmail(loginDto.email);
      const dataPayload: PayloadToken = {
        user_id: userWithEmail.user_id,
        user_name: userWithEmail.user_name,
        email: userWithEmail.email,
        avatar: userWithEmail.avatar,
      };
      const accessToken = this.jwtService.sign(dataPayload);
      const refreshToken = this.jwtService.sign(dataPayload, {
        secret: process.env.REFRESH_SECRET_KEY,
        expiresIn: process.env.EXPIRES_REFRESH_TOKEN,
      });
      return {
        AT: accessToken,
        RT: refreshToken,
      };
    } catch (error) {
      console.log(error);
      
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async refreshToken(token: string) {
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: process.env.REFRESH_SECRET_KEY,
      });

      const userWithId = await this.userRepos.findById(decoded.user_id);
      if (userWithId) {
        if (userWithId.email === decoded.email) {
          const newPayloadToken: PayloadToken = {
            user_id: decoded.user_id,
            user_name: decoded.user_name,
            email: decoded.email,
            avatar: decoded.avatar,
          };
          const accessToken = this.jwtService.sign(newPayloadToken);
          return { AT: accessToken };
        }
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
