import { IsDate, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";
import { Type } from "class-transformer";


export class UpdateEmployeeDto {
  @IsOptional()
  @IsString({ message: 'Tên nhân viên phải là chuỗi' })
  @MaxLength(100, { message: 'Tên nhân viên không được quá 100 ký tự' })
  employeeName?: string;  // Đổi từ bắt buộc sang tùy chọn

  @IsOptional()
  @IsDate({ message: 'Ngày tham gia phải là một ngày hợp lệ' })
  @Type(() => Date) // Chuyển đổi input thành Date
  joiningDate?: Date;

  @IsOptional()
  @IsString({ message: 'Ảnh hồ sơ phải là chuỗi' })
  @MaxLength(255, { message: 'Đường dẫn ảnh hồ sơ không được quá 255 ký tự' })
  employeeProfile?: string;

  @IsOptional()
  @IsPhoneNumber(undefined, { message: 'Số điện thoại không hợp lệ' }) 
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  @MaxLength(500, { message: 'Mô tả không được quá 500 ký tự' })
  description?: string; 

}
