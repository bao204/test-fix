import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true, trim: true })
  taskName: string;  // Tên nhiệm vụ

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Progress' })
  progressId: mongoose.Types.ObjectId;  // Tham chiếu đến Progress

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TaskCategory' })
  taskCategory: mongoose.Types.ObjectId;  // Tham chiếu đến TaskCategory


  @Prop({ required: true, type: Date })
  taskStart: Date;  // Ngày bắt đầu nhiệm vụ

  @Prop({ required: true, type: Date })
  taskEnd: Date;  // Ngày kết thúc nhiệm vụ

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'NotificationSent' })
  notificationSent: mongoose.Types.ObjectId;  // Tham chiếu đến NotificationSent

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  taskAssignPerson: mongoose.Types.ObjectId;  // Tham chiếu đến Employee (người giao nhiệm vụ)

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  taskRecipient: mongoose.Types.ObjectId;  // Tham chiếu đến Employee (người nhận nhiệm vụ)

  @Prop({ required: true, trim: true })
  priority: string;  // Mức độ ưu tiên của nhiệm vụ

  @Prop({ required: true, trim: true })
  description: string;  // Mô tả chi tiết nhiệm vụ

  @Prop({ required: true, trim: true })
  status: string;  // Trạng thái của nhiệm vụ (ví dụ: "Hoàn thành", "Đang tiến hành")
}

export const TaskSchema = SchemaFactory.createForClass(Task);
