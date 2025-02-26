import { IsMongoId, IsOptional, IsString } from "class-validator";

export class UpdateTeamDto {
  @IsOptional()
  @IsString({ message: 'Tên đội nhóm phải là chuỗi' })
  teamName?: string;

  @IsOptional()
  @IsMongoId({ message: 'teamLead phải là ObjectId hợp lệ' })
  teamLead?: string;

  @IsOptional()
  @IsMongoId({ message: 'projectid phải là ObjectId hợp lệ' })
  projectid?: string;
}
