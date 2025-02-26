import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TaskCategory extends Document {
  @Prop({ required: true, trim: true })
  taskCategoryName: string;  
 };

export const TaskCategorySchema = SchemaFactory.createForClass(TaskCategory);
