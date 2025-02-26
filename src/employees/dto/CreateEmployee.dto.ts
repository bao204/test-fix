import { 
  IsDate, 
  IsNotEmpty, 
  IsOptional, 
  IsPhoneNumber, 
  IsString, 
  MaxLength, 
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { CreateAccountDto } from "src/accounts/dto/CreateAccount.dto";
import { CreateProjectPermissionsDto } from "src/projectpermissions/dto/CreateProjectPermission.dto";
import { Types } from "mongoose";

export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'Tên nhân viên là bắt buộc' })
  @IsString({ message: 'Tên nhân viên phải là chuỗi' })
  @MaxLength(100, { message: 'Tên nhân viên không được quá 100 ký tự' })
  employeeName: string;

  @IsOptional()
  @IsString({ message: 'Ảnh hồ sơ phải là chuỗi' })
  @MaxLength(255, { message: 'Đường dẫn ảnh hồ sơ không được quá 255 ký tự' })
  employeeProfile?: string;  

  @IsOptional()
  @IsDate({ message: 'Ngày tham gia phải là một ngày hợp lệ' })
  @Type(() => Date) // Chuyển đổi input thành Date
  joiningDate?: Date;

  @IsOptional()
  @IsPhoneNumber(undefined, { message: 'Số điện thoại không hợp lệ' }) 
  phone?: string;  

  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  @MaxLength(500, { message: 'Mô tả không được quá 500 ký tự' })
  description?: string; 

 @IsOptional()
  @IsString({ message: 'team_id phải là chuỗi ObjectId hợp lệ' })  
  team_id?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'department_id phải là chuỗi ObjectId hợp lệ' })  
  department_id?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'designation_id phải là chuỗi ObjectId hợp lệ' })  
  designation_id?: Types.ObjectId;


   @IsOptional()
      @ValidateNested()
      @Type(()=>CreateAccountDto)
      account?:CreateAccountDto;

      @IsOptional()
      @ValidateNested()
      @Type(()=>CreateProjectPermissionsDto)
      projectpermission?:CreateProjectPermissionsDto[];
 
}
