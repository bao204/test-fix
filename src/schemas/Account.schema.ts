import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop({ required: true, trim: true })
  userName!: string;

  @Prop({ required: true, trim: true })
  password!: string;

  @Prop({ required: true, trim: true })
  email!: string;

 
}


export const AccountSchema = SchemaFactory.createForClass(Account);
