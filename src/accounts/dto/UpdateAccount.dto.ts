import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateAccountDto {
  @IsOptional()
  @IsString({ message: 'Tên tài khoản phải là chuỗi' })
  @MaxLength(50, { message: 'Tên tài khoản không được quá 50 ký tự' })
  userName?: string;

  @IsOptional()
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @MaxLength(100, { message: 'Mật khẩu không được quá 100 ký tự' })
  password?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @MaxLength(100, { message: 'Email không được quá 100 ký tự' })
  email?: string;
}
