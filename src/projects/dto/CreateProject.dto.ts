import {  IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Tên dự án là bắt buộc' })
  @IsString({ message: 'Tên dự án phải là chuỗi' })
  @MaxLength(100, { message: 'Tên dự án không được quá 100 ký tự' })
  projectName: string;


  @IsOptional()
  @IsString({ message: 'projectCategory phải là chuỗi ObjectId hợp lệ' })  
  projectCategory?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'Ảnh hồ sơ phải là chuỗi' })
  @MaxLength(255, { message: 'Đường dẫn ảnh hồ sơ không được quá 255 ký tự' })
  projectImage: string;

  @IsNotEmpty({ message: 'Ngày bắt đầu dự án là bắt buộc' })

  projectStart: Date;

  @IsNotEmpty({ message: 'Ngày kết thúc dự án là bắt buộc' })

  projectEnd: Date;


  @IsOptional()
  @IsString({ message: 'notificationSent phải là chuỗi ObjectId hợp lệ' })  
  notificationSent?: Types.ObjectId;

    @IsOptional()
    @IsString({ message: 'employee_id phải là chuỗi ObjectId hợp lệ' })  
    assignedPerson?: Types.ObjectId;

  @IsNotEmpty({ message: 'Ngân sách là bắt buộc' })
  budget: number;

  @IsNotEmpty({ message: 'Mức độ ưu tiên là bắt buộc' })
  @IsString({ message: 'Mức độ ưu tiên phải là chuỗi' })
  @MaxLength(50, { message: 'Mức độ ưu tiên không được quá 50 ký tự' })
  priority: string;

  @IsNotEmpty({ message: 'Mô tả dự án là bắt buộc' })
  @IsString({ message: 'Mô tả phải là chuỗi' })
  @MaxLength(500, { message: 'Mô tả dự án không được quá 500 ký tự' })
  description: string;
}
