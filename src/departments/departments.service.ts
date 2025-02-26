import { InjectModel } from '@nestjs/mongoose';
import { Department } from './../schemas/Department.schema';
import { Injectable } from '@nestjs/common';
import { Model,Types } from 'mongoose';
import { CreateDepartmentDto } from './dto/CreateDepartment.dto';
import { UpdateDepartmentDto } from './dto/UpdateDepartment.dto';
 // Đảm bảo có DTO này

@Injectable()
export class DepartmentService {
  constructor(@InjectModel(Department.name) private departmentModel: Model<Department>) {}

  // Tạo mới department
  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const createdDepartment = new this.departmentModel(createDepartmentDto);
    return createdDepartment.save();
  }

  // Lấy danh sách tất cả department
  async getDepartment()
  {
    return this.departmentModel.find();
  }

  // Lấy department theo ID
async getDepartmentById(id:Types.ObjectId| string)
{
return this.departmentModel.findById(id);
}

  // Cập nhật department
 async updateDepartment(id:string,updateDepartmentDto:UpdateDepartmentDto)
 {
    return this.departmentModel.findByIdAndUpdate(id,updateDepartmentDto,{new:true});
 }

  // Xóa department
  async deleteDepartment(id:string)
  {
    return this.departmentModel.findByIdAndDelete(id);
  }
}
