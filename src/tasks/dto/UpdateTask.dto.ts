import { IsOptional, IsString,  MaxLength } from "class-validator";
import { Types } from "mongoose";

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'Tên nhiệm vụ phải là chuỗi' })
  @MaxLength(100, { message: 'Tên nhiệm vụ không được quá 100 ký tự' })
  taskName?: string;

  @IsOptional()
  progressName?: Types.ObjectId;

  @IsOptional()
  taskCategory?: Types.ObjectId;


  @IsOptional()
  taskStart?: Date;

  @IsOptional()

  taskEnd?: Date;

  @IsOptional()
  notificationSent?: Types.ObjectId;

  @IsOptional()
  taskAssignPerson?: Types.ObjectId;

  @IsOptional()
  taskRecipient?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'Mức độ ưu tiên phải là chuỗi' })
  priority?: string;

  @IsOptional()
  @IsString({ message: 'Mô tả nhiệm vụ phải là chuỗi' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Trạng thái nhiệm vụ phải là chuỗi' })
  status?: string;
}
