import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTaskCategoryDto {
  @IsOptional()
  @IsString({ message: 'Tên danh mục nhiệm vụ phải là chuỗi' })
  @MaxLength(100, { message: 'Tên danh mục nhiệm vụ không được quá 100 ký tự' })
  taskCategoryName?: string;
}
