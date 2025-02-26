import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ProjectCategory } from 'src/schemas/ProjectCategory.schema';
import { CreateProjectCategoryDto } from './dto/CreateProjectCategory.dto';
import { UpdateProjectCategoryDto } from './dto/UpdateProjectCategory.dto';


@Injectable()
export class ProjectCategoryService {
  constructor(@InjectModel(ProjectCategory.name) private projectCategoryModel: Model<ProjectCategory>) {}

  // Tạo mới 
  async create(createProjectCategoryDto: CreateProjectCategoryDto): Promise<ProjectCategory> {
    const createProjectCategory = new this.projectCategoryModel(createProjectCategoryDto);
    return createProjectCategory.save();
  }

  // Lấy danh sách tất cả department
  async getProjectCategory()
  {
    return this.projectCategoryModel.find();
  }

  // Lấy department theo ID
async getProjectCategoryById(id:Types.ObjectId | string)
{
return this.projectCategoryModel.findById(id);
}

  // Cập nhật department
 async updateProjectCategory(id:string,updateProjectCategoryDto:UpdateProjectCategoryDto)
 {
    return this.projectCategoryModel.findByIdAndUpdate(id,updateProjectCategoryDto,{new:true});
 }

  // Xóa department
  async deleteProjectCategory(id:string)
  {
    return this.projectCategoryModel.findByIdAndDelete(id);
  }
}
