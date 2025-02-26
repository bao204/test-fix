import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { TaskCategory } from 'src/schemas/TaskCategory.schema';
import { CreateTaskCategoryDto } from './dto/CreateTaskCategory.dto';
import { UpdateTaskCategoryDto } from './dto/UpdateTaskCategory.dto';


@Injectable()
export class TaskCategoryService {
  constructor(@InjectModel(TaskCategory.name) private taskCategoryModel: Model<TaskCategory>) {}

  // Tạo mới 
  async create(createTaskCategoryDto: CreateTaskCategoryDto): Promise<TaskCategory> {
    const createTaskCategory = new this.taskCategoryModel(createTaskCategoryDto);
    return createTaskCategory.save();
  }

  // Lấy danh sách tất cả taskCategory
  async getTaskCategory()
  {
    return this.taskCategoryModel.find();
  }

  // Lấy taskCategory theo ID
  async getTaskCategoryById(id:Types.ObjectId | string)
  {
    return this.taskCategoryModel.findById(id);
  }

  // Cập nhật taskCategory
  async updateTaskCategory(id:string, updateTaskCategoryDto:UpdateTaskCategoryDto)
  {
    return this.taskCategoryModel.findByIdAndUpdate(id, updateTaskCategoryDto, { new:true });
  }

  // Xóa taskCategory
  async deleteTaskCategory(id:string)
  {
    return this.taskCategoryModel.findByIdAndDelete(id);
  }
}
