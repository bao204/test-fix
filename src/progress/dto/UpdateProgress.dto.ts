import { IsOptional, IsMongoId, IsString, MaxLength } from "class-validator";

export class UpdateProgressDto {
  @IsOptional()
  @IsString({ message: 'Tên tiến độ công việc phải là chuỗi' })
  @MaxLength(100, { message: 'Tên tiến độ công việc không được quá 100 ký tự' })
  progressName?: string;

  @IsOptional()
  @IsMongoId({ message: 'projectid phải là ObjectId hợp lệ' })
  projectid?: string;

  @IsOptional()
  @IsMongoId({ message: 'progressCategory phải là ObjectId hợp lệ' })
  progressCategory?: string;



  @IsOptional()
  progressStart?: Date;

  @IsOptional()
  progressEnd?: Date;

  @IsOptional()
  @IsMongoId({ message: 'notificationSent phải là ObjectId hợp lệ' })
  notificationSent?: string;

  @IsOptional()
  @IsMongoId({ message: 'taskAssignPerson phải là ObjectId hợp lệ' })
  taskAssignPerson?: string;

  @IsOptional()
  @IsMongoId({ message: 'taskRecipient phải là ObjectId hợp lệ' })
  taskRecipient?: string;

  @IsOptional()
  @IsString({ message: 'Mức độ ưu tiên phải là chuỗi' })
  @MaxLength(50, { message: 'Mức độ ưu tiên không được quá 50 ký tự' })
  priority?: string;

  @IsOptional()
  @IsString({ message: 'Mô tả tiến độ công việc phải là chuỗi' })
  @MaxLength(500, { message: 'Mô tả tiến độ công việc không được quá 500 ký tự' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Trạng thái phải là chuỗi' })
  @MaxLength(50, { message: 'Trạng thái không được quá 50 ký tự' })
  status?: string;
}
