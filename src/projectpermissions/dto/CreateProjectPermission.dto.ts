import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateProjectPermissionsDto {
  @IsNotEmpty({ message: 'Tên tài nguyên là bắt buộc' })
  @IsString({ message: 'Tên tài nguyên phải là chuỗi' })
  resourceName: string;

  @IsOptional()
  @IsBoolean({ message: 'Giá trị phải là true hoặc false' })
  can_read?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Giá trị phải là true hoặc false' })
  can_write?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Giá trị phải là true hoặc false' })
  can_create?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Giá trị phải là true hoặc false' })
  can_delete?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Giá trị phải là true hoặc false' })
  can_import?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Giá trị phải là true hoặc false' })
  can_export?: boolean;

 
}
