import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto {
  @IsNotEmpty({ message: 'Tên đội nhóm là bắt buộc' })
  @IsString({ message: 'Tên đội nhóm phải là chuỗi' })
  teamName: string;

  @IsNotEmpty({ message: 'Người lãnh đạo là bắt buộc' })
  @IsMongoId({ message: 'teamLead phải là ObjectId hợp lệ' })
  teamLead: string;

  @IsNotEmpty({ message: 'Dự án là bắt buộc' })
  @IsMongoId({ message: 'projectid phải là ObjectId hợp lệ' })
  projectid: string;
}
