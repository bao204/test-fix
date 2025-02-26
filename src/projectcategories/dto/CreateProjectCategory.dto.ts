import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateProjectCategoryDto {
  @IsNotEmpty({ message: 'Tên danh mục dự án là bắt buộc' })
  @IsString({ message: 'Tên danh mục dự án phải là chuỗi' })
  @MaxLength(100, { message: 'Tên danh mục dự án không được quá 100 ký tự' })
  projectCategoryName: string;
}
