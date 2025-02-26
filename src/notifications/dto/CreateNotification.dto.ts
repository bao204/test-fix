import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateNotificationSentDto {
  @IsNotEmpty({ message: 'Tên thông báo là bắt buộc' })
  @IsString({ message: 'Tên thông báo phải là chuỗi' })
  @MaxLength(100, { message: 'Tên thông báo không được quá 100 ký tự' })
  notification_name: string;
}
