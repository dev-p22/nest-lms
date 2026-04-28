import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: registerDto) {
    const saltOrRounds = 10;
    const password = registerUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const result = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    const payload = { sub: result._id, role: result.role };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async loginUser(loginUserDto: loginDto) {
    // call getLoginUser from userservice
    const user = await this.userService.getLoginUser(loginUserDto);
    // create jwt
    const payload = { sub: user._id, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    // return access_token
    return { access_token: token };
  }

  async getProfile(userId: string) {
    const result = await this.userService.getUserById(userId);

    return result;
  }
}
