import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateNotificationSentDto {
  @IsOptional()
  @IsString({ message: 'Tên thông báo phải là chuỗi' })
  @MaxLength(100, { message: 'Tên thông báo không được quá 100 ký tự' })
  notification_name?: string;
}
