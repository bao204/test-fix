import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ProgressCategory } from 'src/schemas/ProgressCategory.schema';
import { CreateProgressCategoryDto } from './dto/CreatProgressCategory.dto';
import { UpdateProgressCategoryDto } from './dto/UpdateProgressCategoryDto ';


@Injectable()
export class ProgressCategoryService {
  constructor(@InjectModel(ProgressCategory.name) private progressCategoryModel: Model<ProgressCategory>) {}

  // Tạo mới 
  async create(createProgressCategoryDto: CreateProgressCategoryDto): Promise<ProgressCategory> {
    const createProgressCategory = new this.progressCategoryModel(createProgressCategoryDto);
    return createProgressCategory.save();
  }

  // Lấy danh sách tất cả progressCategory
  async getProgressCategory()
  {
    return this.progressCategoryModel.find();
  }

  // Lấy progressCategory theo ID
  async getProgressCategoryById(id:Types.ObjectId | string)
  {
    return this.progressCategoryModel.findById(id);
  }

  // Cập nhật progressCategory
  async updateProgressCategory(id:string, updateProgressCategoryDto:UpdateProgressCategoryDto)
  {
    return this.progressCategoryModel.findByIdAndUpdate(id, updateProgressCategoryDto, { new:true });
  }

  // Xóa progressCategory
  async deleteProgressCategory(id:string)
  {
    return this.progressCategoryModel.findByIdAndDelete(id);
  }
}
