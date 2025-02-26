import { IsOptional, IsMongoId, IsNumber, IsString, MaxLength, IsDate } from "class-validator";

export class UpdateProjectDto {
  @IsOptional()
  @IsString({ message: 'Tên dự án phải là chuỗi' })
  @MaxLength(100, { message: 'Tên dự án không được quá 100 ký tự' })
  projectName?: string;

  @IsOptional()
  @IsMongoId({ message: 'projectCategory phải là ObjectId hợp lệ' })
  projectCategory?: string;

  @IsOptional()
  @IsString({ message: 'Hình ảnh dự án phải là chuỗi' })
  @MaxLength(255, { message: 'Đường dẫn hình ảnh không được quá 255 ký tự' })
  projectImage?: string;

  @IsOptional()
  @IsDate({ message: 'Ngày bắt đầu phải là một ngày hợp lệ' })
  projectStart?: Date;

  @IsOptional()
  @IsDate({ message: 'Ngày kết thúc phải là một ngày hợp lệ' })
  projectEnd?: Date;

  @IsOptional()
  @IsMongoId({ message: 'notificationSent phải là ObjectId hợp lệ' })
  notificationSent?: string;

  @IsOptional()
  @IsMongoId({ message: 'assignedPerson phải là ObjectId hợp lệ' })
  assignedPerson?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Ngân sách phải là số' })
  budget?: number;

  @IsOptional()
  @IsString({ message: 'Mức độ ưu tiên phải là chuỗi' })
  @MaxLength(50, { message: 'Mức độ ưu tiên không được quá 50 ký tự' })
  priority?: string;

  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  @MaxLength(500, { message: 'Mô tả dự án không được quá 500 ký tự' })
  description?: string;
}
