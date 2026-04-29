import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(AuthGuard)
  @Post(':courseId')
  purchase(@Param('courseId') courseId: string, @Request() req) {
    const userId = req.user.sub;
    return this.purchaseService.purchaseCourse(courseId, userId as string);
  }
}
