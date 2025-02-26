import {  IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";

export class CreateReportDto {


  @IsNotEmpty({ message: 'Tên báo cáo là bắt buộc' })
  reportName: string;

  @IsNotEmpty({ message: 'Thời gian nộp báo cáo là bắt buộc' })
  submission_time: Date;
  

  @IsNotEmpty({ message: 'Trạng thái báo cáo là bắt buộc' })
  @IsString({ message: 'Trạng thái phải là chuỗi' })
  @MaxLength(50, { message: 'Trạng thái không được quá 50 ký tự' })
  status: string;

  @IsOptional()
  @IsString({ message: 'Ghi chú báo cáo phải là chuỗi' })
  @MaxLength(500, { message: 'Ghi chú báo cáo không được quá 500 ký tự' })
  notereport?: string;

  @IsOptional()
  @IsString({ message: 'Đường dẫn file báo cáo phải là chuỗi' })
  @MaxLength(255, { message: 'Đường dẫn file báo cáo không được quá 255 ký tự' })
  filerepport?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'ID nhân viên là bắt buộc' })
  @IsString({ message: 'ID nhân viên phải là chuỗi ObjectId hợp lệ' })
  id_employee: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'ID nhiệm vụ phải là chuỗi ObjectId hợp lệ' })
  id_task?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'ID tiến độ phải là chuỗi ObjectId hợp lệ' })
  id_progress?: Types.ObjectId;
}
