import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { AuthCredentialDto } from '../dto/auth-credential.dto';
import { User } from '../models/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // create user
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    try {
      const { email, password, username } = authCredentialDto;

      // hash password
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(password, salt);

      // user
      const user = await this.create({
        username,
        email,
        password: hashPassword,
      });

      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
