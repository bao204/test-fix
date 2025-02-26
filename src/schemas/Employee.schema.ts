import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Account } from './Account.schema';


@Schema()
export class Employee extends Document {
  @Prop({ required: true, trim: true })
  employeeName: string;  // Bắt buộc, loại bỏ khoảng trắng thừa

  @Prop({ required: false, trim: true })
  employeeProfile?: string;  // Không bắt buộc, có thể null

  @Prop({ required: true, type: Date })
  joiningDate: Date;  // Bắt buộc phải có ngày tham gia

  @Prop({
    required: false,
    trim: true,
    match: [/^\+?[0-9]{7,15}$/, 'Số điện thoại không hợp lệ'],  // Kiểm tra số điện thoại hợp lệ
  })
  phone?: string;  // Không bắt buộc, phải là số hợp lệ

  @Prop({ required: false, trim: true, maxlength: 500 })
  description?: string;  // Không bắt buộc, tối đa 500 ký tự

  // Các trường tham chiếu (references) đến các bảng khác
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  team_id?: mongoose.Types.ObjectId;  // Quan hệ với Team (nếu có)

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department_id?: mongoose.Types.ObjectId;  // Quan hệ với Department

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Designation' })
  designation_id?: mongoose.Types.ObjectId;  // Quan hệ với Designation

    @Prop({ type:mongoose.Schema.Types.ObjectId,ref:'Account'})
    account?: Account;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'ProjectPermissions' })
    projectpermission?: Types.ObjectId[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
