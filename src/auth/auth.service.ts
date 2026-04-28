import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registerUser(registerUserDto: registerDto) {
    const saltOrRounds = 10;
    const password = registerUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const result = this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    return { success: true, message: 'user Register successfully', result };
  }
}
