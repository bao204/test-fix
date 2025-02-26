import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Department extends Document {
  @Prop({ required: true, trim: true })
  nameDepartment: string;  
 };

export const DepartmentSchema = SchemaFactory.createForClass(Department);
