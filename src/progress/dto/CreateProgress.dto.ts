import {  IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";

export class CreateProgressDto {
  @IsNotEmpty({ message: 'Tên tiến độ công việc là bắt buộc' })
  @IsString({ message: 'Tên tiến độ công việc phải là chuỗi' })
  @MaxLength(100, { message: 'Tên tiến độ công việc không được quá 100 ký tự' })
  progressName: string;

    @IsOptional()
    @IsString({ message: 'project phải là chuỗi ObjectId hợp lệ' })  
    projectid?: Types.ObjectId;

    @IsOptional()
    @IsString({ message: 'progressCategory phải là chuỗi ObjectId hợp lệ' })  
    progressCategory?: Types.ObjectId;



  @IsOptional()
  @IsNotEmpty({ message: 'Ngày bắt đầu tiến độ công việc là bắt buộc' })
 
  progressStart: Date;
  @IsOptional()
  @IsNotEmpty({ message: 'Ngày kết thúc tiến độ công việc là bắt buộc' })
 
  progressEnd: Date;

  @IsOptional()
  @IsString({ message: 'notificationSent phải là chuỗi ObjectId hợp lệ' })  
  notificationSent?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'taskAssignPerson phải là chuỗi ObjectId hợp lệ' })  
  taskAssignPerson?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'taskRecipient phải là chuỗi ObjectId hợp lệ' })  
  taskRecipient?: Types.ObjectId;



  @IsNotEmpty({ message: 'Mức độ ưu tiên là bắt buộc' })
  @IsString({ message: 'Mức độ ưu tiên phải là chuỗi' })
  @MaxLength(50, { message: 'Mức độ ưu tiên không được quá 50 ký tự' })
  priority: string;

  @IsNotEmpty({ message: 'Mô tả tiến độ công việc là bắt buộc' })
  @IsString({ message: 'Mô tả phải là chuỗi' })
  @MaxLength(500, { message: 'Mô tả tiến độ công việc không được quá 500 ký tự' })
  description: string;

  @IsNotEmpty({ message: 'Trạng thái tiến độ công việc là bắt buộc' })
  @IsString({ message: 'Trạng thái phải là chuỗi' })
  @MaxLength(50, { message: 'Trạng thái không được quá 50 ký tự' })
  status: string;
}
