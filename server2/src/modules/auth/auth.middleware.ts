import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../users/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userRepos: UserRepository) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/auth/register') {
      const checkUser = await this.userRepos.findByEmail(req.body.email);
      if (checkUser) {
        throw new BadRequestException('Email is exist');
      }
      next();
    } else if (req.path === '/auth/login') {
      const checkUser = await this.userRepos.findByEmail(req.body.email);

      if (!checkUser) {
        return res
          .status(404)
          .json({ message: 'Not Found Account With This Email' });
      }

      const comparePassword = await bcrypt.compare(
        req.body.password,
        checkUser.password,
      );
      if (!comparePassword) {
        return res.status(401).json({ message: 'Invalid Password' });
      }

      if (checkUser.role === 0) {
        return res.status(403).json({ message: 'Account blocked' });
      }
      next();
    }
  }
}
