import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/registerUser.dto';
import { loginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth') // it is prefix if we create route then it start with auth/
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: registerDto) {
    const token = await this.authService.registerUser(registerUserDto);
    return {
      access_token: token,
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: loginDto) {
    // call loginuser and return access_token
    return await this.authService.loginUser(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    const userId = req.user.sub;
    return await this.authService.getProfile(userId);
  }
}
