import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NotificationSent extends Document {
  @Prop({ required: true, trim: true })
  notification_name: string;  
 };

export const NotificationSentSchema = SchemaFactory.createForClass(NotificationSent);
