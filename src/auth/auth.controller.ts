import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/registerUser.dto';

@Controller('auth') // it is prefix if we create route then it start with auth/
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: registerDto) {
    const result = this.authService.registerUser(registerUserDto);
    return result;
  }
}
