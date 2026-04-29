import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/courses')
  findAll(@Request() req) {
    const userId = req.user.sub;
    return this.userService.getAllPurchasesCourses(userId as string);
  }
}
