import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateDesignationDto {
  @IsOptional()
  @IsString({ message: 'Tên chức danh phải là chuỗi' })
  @MaxLength(100, { message: 'Tên chức danh không được quá 100 ký tự' })
  designationName?: string;
}
