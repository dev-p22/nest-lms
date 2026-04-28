import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { registerDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { loginDto } from 'src/auth/dto/loginUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: registerDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error: any) {
      const dublicateKeyCode = 11000;
      if (error?.code === dublicateKeyCode) {
        const field = Object.keys(error.keyPattern || {})[0] || 'value';
        throw new ConflictException(`Duplicate ${field} is not allowed`);
      }

      throw error;
    }
  }

  async getLoginUser(loginUserDto: loginDto) {
    // find user
    const user = await this.userModel.findOne({ email: loginUserDto.email });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // password check

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // return user
    return user;
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');

    return user;
  }
}
