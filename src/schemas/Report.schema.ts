import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Report extends Document {

  @Prop({ required: true, trim: true })
  reportName: string; // Tên báo cáo

  @Prop({ required: true, type: Date, default: Date.now })
  submission_time: Date; // Thời gian nộp báo cáo

  @Prop({ required: true, trim: true })
  status: string; // Trạng thái báo cáo

  @Prop({ trim: true })
  notereport: string; // Ghi chú báo cáo

  @Prop({ trim: true })
  filerepport: string; // Đường dẫn file báo cáo

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true })
  id_employee: mongoose.Types.ObjectId; // Tham chiếu đến Employee

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: false })
  id_task?: mongoose.Types.ObjectId; // Tham chiếu đến Task

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Progress', required: false })
  id_progress?: mongoose.Types.ObjectId; // Tham chiếu đến Progress
}

export const ReportSchema = SchemaFactory.createForClass(Report);
