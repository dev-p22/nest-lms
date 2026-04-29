import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Purchase } from './schemas/purchase.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private courseService: CourseService,
  ) {}

  async purchaseCourse(courseId: string, userId: string) {
    if (!courseId || !userId) {
      throw new UnauthorizedException('You are not authorize');
    }

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const course = await this.courseService.findOne(courseId);

    if (!course) {
      throw new UnauthorizedException();
    }

    const existingPurchase = await this.purchaseModel.findOne({
      userId,
      courseId,
    });

    if (existingPurchase) {
      throw new ConflictException('Already Purchased');
    }

    const purchase = await this.purchaseModel.create({
      userId,
      courseId,
    });

    return purchase;
  }

  async getAllPurchasedCourse(userId) {
    if (!userId) {
      throw new UnauthorizedException('You are not authorize');
    }

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const courses = await this.purchaseModel
      .find({ userId })
      .populate('courseId');

    return courses.map((c: any) => ({
      courseId: c.courseId._id,
      name: c.courseId.name,
      description: c.courseId.description,
      price: c.courseId.price,
      purchasedAt: c.purchasedAt,
    }));
  }
}
