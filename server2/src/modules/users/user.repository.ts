import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from 'src/dtos/user/user.dto';
import { User } from 'src/entities/user.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserRepository {
  private userRepos: Repository<User>;
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.userRepos = dataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepos.find();
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepos.findOneBy({ user_id: id });
      return user;
    } catch (error) {
      throw new NotFoundException('Not found user with this id');
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepos.findOneBy({ email: email });
      return user;
    } catch (error) {
      throw new NotFoundException('Not found user with this email');
    }
  }

  async createOne(data: Partial<User>): Promise<User> {
    try {
      const createdUser = await this.userRepos.save(data);
      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async updateOne(id: string, userDto: UserDto): Promise<UpdateResult> {
    const findUser = await this.userRepos.findOneBy({ user_id: id });
    if (!findUser) {
      throw new NotFoundException('Not Found User With This Id');
    } else {
      return await this.userRepos.update({ user_id: id }, userDto);
    }
  }

  async updateUserName(id: string, userName: string): Promise<UpdateResult> {
    const findUser = await this.userRepos.findOneBy({ user_id: id });
    if (!findUser) {
      throw new NotFoundException('Not Found User With This Id');
    } else {
      return await this.userRepos.update(
        { user_id: id },
        { user_name: userName },
      );
    }
  }

  async updatePassword(id: string, password: string): Promise<UpdateResult> {
    const findUser = await this.userRepos.findOneBy({ user_id: id });
    if (!findUser) {
      throw new NotFoundException('Not Found User With This Id');
    } else {
      return await this.userRepos.update(
        { user_id: id },
        { password: password },
      );
    }
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    const findUser = await this.userRepos.findOneBy({ user_id: id });
    if (!findUser) {
      throw new NotFoundException('Not found user with this id');
    }
    const result = await this.userRepos.delete(id);
    if (result) {
      return result;
    } else {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
