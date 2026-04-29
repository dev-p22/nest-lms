import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PurchaseDocument = HydratedDocument<Purchase>;

@Schema()
export class Purchase {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course' })
  courseId!: Types.ObjectId;

  @Prop({ default: Date.now() })
  purchasedAt!: Date;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
