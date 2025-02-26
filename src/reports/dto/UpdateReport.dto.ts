import {  IsOptional, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";

export class UpdateReportDto {
 
  @IsOptional()
  @IsString({ message: 'Tên báo cáo phải là chuỗi' })
  @MaxLength(100, { message: 'Tên báo cáo không được quá 100 ký tự' })
  reportName?: string;

  @IsOptional()
  submission_time?: Date;

  @IsOptional()
  @IsString({ message: 'Trạng thái phải là chuỗi' })
  @MaxLength(50, { message: 'Trạng thái không được quá 50 ký tự' })
  status?: string;

  @IsOptional()
  @IsString({ message: 'Ghi chú báo cáo phải là chuỗi' })
  @MaxLength(500, { message: 'Ghi chú báo cáo không được quá 500 ký tự' })
  notereport?: string;

  @IsOptional()
  @IsString({ message: 'Đường dẫn file báo cáo phải là chuỗi' })
  @MaxLength(255, { message: 'Đường dẫn file báo cáo không được quá 255 ký tự' })
  filerepport?: string;

  @IsOptional()
  @IsString({ message: 'ID nhân viên phải là chuỗi ObjectId hợp lệ' })
  id_employee?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'ID nhiệm vụ phải là chuỗi ObjectId hợp lệ' })
  id_task?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'ID tiến độ phải là chuỗi ObjectId hợp lệ' })
  id_progress?: Types.ObjectId;
}
