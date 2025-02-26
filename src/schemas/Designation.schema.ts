import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Designation extends Document {
  @Prop({ required: true, trim: true })
  designationName: string;
 };

export const DesignationSchema = SchemaFactory.createForClass(Designation);
