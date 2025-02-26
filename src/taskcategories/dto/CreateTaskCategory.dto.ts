import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTaskCategoryDto {
  @IsNotEmpty({ message: 'Tên danh mục nhiệm vụ là bắt buộc' })
  @IsString({ message: 'Tên danh mục nhiệm vụ phải là chuỗi' })
  @MaxLength(100, { message: 'Tên danh mục nhiệm vụ không được quá 100 ký tự' })
  taskCategoryName: string;
}
