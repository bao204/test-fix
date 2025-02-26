
//@Schema() và @Prop() là các decorator 
// framework NestJS và Mongoose hiểu rằng class User là một schema và các thuộc tính của nó sẽ là các trường trong MongoDB.
//SchemaFactory là một "factory"
//Factory (ở đây là SchemaFactory) sẽ tự động tạo ra schema cho bạn từ class User.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSettings.schema';
import { Post } from './Post.schema';

@Schema()
export class User {
  @Prop({  required: true })
  username: string;

  @Prop({ required: false })
  displayName: string;

  @Prop({ required: false })
  avatarUrl?: string;
  @Prop({ type:mongoose.Schema.Types.ObjectId,ref:'UserSettings'})
  setting?: UserSettings;
  @Prop({type:[{ type:mongoose.Schema.Types.ObjectId,ref:'Post'}]})
  posts:Post[];

}

export const UserSchema = SchemaFactory.createForClass(User);
