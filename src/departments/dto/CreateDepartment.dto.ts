import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateDepartmentDto {
  @IsNotEmpty({ message: 'Tên phòng ban là bắt buộc' })
  @IsString({ message: 'Tên phòng ban phải là chuỗi' })
  @MaxLength(100, { message: 'Tên phòng ban không được quá 100 ký tự' })
  nameDepartment: string;
}
