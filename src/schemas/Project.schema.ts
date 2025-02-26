  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
  import { Document } from 'mongoose';
  import * as mongoose from 'mongoose';

  @Schema()
  export class Project extends Document {
    @Prop({ required: true, trim: true })
    projectName: string;  // Tên dự án

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectCategory' })
    projectCategory: mongoose.Types.ObjectId;  // Tham chiếu đến ProjectCategory

    @Prop({ required: true, trim: true })
    projectImage: string;  // Hình ảnh của dự án

    @Prop({ required: true, type: Date })
    projectStart: Date;  // Ngày bắt đầu dự án

    @Prop({ required: true, type: Date })
    projectEnd: Date;  // Ngày kết thúc dự án

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'NotificationSent' })
    notificationSent: mongoose.Types.ObjectId;  // Tham chiếu đến NotificationSent

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
    assignedPerson: mongoose.Types.ObjectId;  // Tham chiếu đến Employee (người được giao)

    @Prop({ required: true, type: Number })  // Dùng Number để lưu trữ float
    budget: number;  // Ngân sách của dự án

    @Prop({ required: true, trim: true })
    priority: string;  // Mức độ ưu tiên của dự án

    @Prop({ required: true, trim: true })
    description: string;  // Mô tả chi tiết dự án
  }

  export const ProjectSchema = SchemaFactory.createForClass(Project);
