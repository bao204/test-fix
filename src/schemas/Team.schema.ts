import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Team extends Document {
  @Prop({ required: true, trim: true })
  teamName: string;  // Bắt buộc, loại bỏ khoảng trắng thừa

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  teamLead: mongoose.Types.ObjectId;  // Liên kết với Employee, đây là người lãnh đạo của đội nhóm

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projectid: mongoose.Types.ObjectId;  // Liên kết với Project, đây là dự án mà đội nhóm này làm việc
}

export const TeamSchema = SchemaFactory.createForClass(Team);
