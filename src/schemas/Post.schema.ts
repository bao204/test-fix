
//@Schema() và @Prop() là các decorator 
// framework NestJS và Mongoose hiểu rằng class User là một schema và các thuộc tính của nó sẽ là các trường trong MongoDB.
//SchemaFactory là một "factory"
//Factory (ở đây là SchemaFactory) sẽ tự động tạo ra schema cho bạn từ class User.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop({  required: true })
  title: string;

  @Prop({ required: false })
  contents: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
