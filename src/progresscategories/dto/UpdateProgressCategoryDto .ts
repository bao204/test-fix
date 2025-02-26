import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateProgressCategoryDto {
  @IsOptional()
  @IsString({ message: 'Tên danh mục tiến độ phải là chuỗi' })
  @MaxLength(100, { message: 'Tên danh mục tiến độ không được quá 100 ký tự' })
  progressCategoryName?: string;
}
