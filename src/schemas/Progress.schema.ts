import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Progress extends Document {
  @Prop({ required: true, trim: true })
  progressName: string;  // Tên tiến độ công việc

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projectid: mongoose.Types.ObjectId;  // Tham chiếu đến Project

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressCategory' })
  progressCategory: mongoose.Types.ObjectId;  // Tham chiếu đến ProgressCategory



  @Prop({ required: true, type: Date })
  progressStart: Date;  // Ngày bắt đầu tiến độ

  @Prop({ required: true, type: Date })
  progressEnd: Date;  // Ngày kết thúc tiến độ

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'NotificationSent' })
  notificationSent: mongoose.Types.ObjectId;  // Tham chiếu đến NotificationSent

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  taskAssignPerson: mongoose.Types.ObjectId;  // Tham chiếu đến Employee (người giao nhiệm vụ)

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  taskRecipient: mongoose.Types.ObjectId;  // Tham chiếu đến Employee (người nhận nhiệm vụ)

  @Prop({ required: true, trim: true })
  priority: string;  // Mức độ ưu tiên của tiến độ

  @Prop({ required: true, trim: true })
  description: string;  // Mô tả chi tiết tiến độ

  @Prop({ required: true, trim: true })
  status: string;  // Trạng thái của tiến độ (ví dụ: 'Hoàn thành', 'Đang tiến hành', v.v.)
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
