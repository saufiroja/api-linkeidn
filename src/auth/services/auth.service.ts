import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialDto } from '../dto/auth-credential.dto';
import { JwtPayload } from '../guards/jwt.payload.interface';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signup(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signin(authCredentialDto: AuthCredentialDto): Promise<{ token }> {
    const { email, password } = authCredentialDto;

    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const token: string = await this.jwtService.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException('Please check your login credential');
    }
  }
}
