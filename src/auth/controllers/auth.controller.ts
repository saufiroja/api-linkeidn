import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialDto } from '../dto/auth-credential.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signup(authCredentialDto);
  }

  @Post('signin')
  signin(
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<{ token: string }> {
    return this.authService.signin(authCredentialDto);
  }
}
