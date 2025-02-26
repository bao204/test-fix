import { IsNotEmpty, IsString,  IsOptional, MaxLength } from "class-validator";
import { Types } from "mongoose";

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Tên nhiệm vụ là bắt buộc' })
  @IsString({ message: 'Tên nhiệm vụ phải là chuỗi' })
  @MaxLength(100, { message: 'Tên nhiệm vụ không được quá 100 ký tự' })
  taskName: string;

  @IsOptional()
  @IsString({ message: 'progressId phải là chuỗi ObjectId hợp lệ' })  
  progressId?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'taskCategory phải là chuỗi ObjectId hợp lệ' })  
  taskCategory?: Types.ObjectId;




  @IsNotEmpty({ message: 'Ngày bắt đầu nhiệm vụ là bắt buộc' })

  taskStart: Date;

  @IsNotEmpty({ message: 'Ngày kết thúc nhiệm vụ là bắt buộc' })

  taskEnd: Date;


  @IsOptional()
  @IsString({ message: 'notificationSent phải là chuỗi ObjectId hợp lệ' })  
  notificationSent?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: 'taskAssignPerson phải là chuỗi ObjectId hợp lệ' })  
  taskAssignPerson?: Types.ObjectId;


  @IsOptional()
  @IsString({ message: 'taskRecipient phải là chuỗi ObjectId hợp lệ' })  
  taskRecipient?: Types.ObjectId;


  @IsNotEmpty({ message: 'Mức độ ưu tiên là bắt buộc' })
  @IsString({ message: 'Mức độ ưu tiên phải là chuỗi' })
  priority: string;

  @IsNotEmpty({ message: 'Mô tả nhiệm vụ là bắt buộc' })
  @IsString({ message: 'Mô tả nhiệm vụ phải là chuỗi' })
  description: string;

  @IsNotEmpty({ message: 'Trạng thái nhiệm vụ là bắt buộc' })
  @IsString({ message: 'Trạng thái nhiệm vụ phải là chuỗi' })
  status: string;
}
