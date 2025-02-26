import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProgressCategory   extends Document {
  @Prop({ required: true, trim: true })
  progressCategoryName: string;
 };

export const ProgressCategorySchema = SchemaFactory.createForClass(ProgressCategory);
