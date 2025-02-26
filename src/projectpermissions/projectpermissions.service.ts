import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectPermissions } from '../schemas/ProjectPermissions.schema';

import { CreateProjectPermissionsDto } from './dto/CreateProjectPermission.dto';
import { UpdateProjectPermissionsDto } from './dto/UpdateProjectPermission.dto';


@Injectable()
export class ProjectPermissionsService {
  constructor(
    @InjectModel(ProjectPermissions.name) 
    private projectPermissionsModel: Model<ProjectPermissions>,

  ) {}

  // ✅ Tạo quyền mới
  async createProjectPermission(createProjectPermissionDto: CreateProjectPermissionsDto): Promise<ProjectPermissions> {

  
   
    const newPermission = new this.projectPermissionsModel(createProjectPermissionDto);

    return await newPermission.save();
  }

  // ✅ Lấy danh sách tất cả quyền
  async getAll() {
    return await this.projectPermissionsModel.find().populate('employee_id');
  }

  // ✅ Lấy quyền của một nhân viên theo employee_id
  async getByEmployee(employee_id: string) {
    const permissions = await this.projectPermissionsModel.find({ employee_id }).populate('employee_id');
    if (!permissions.length) throw new NotFoundException('Không tìm thấy quyền cho nhân viên này');
    return permissions;
  }

  // ✅ Cập nhật quyền dựa trên permission_id
  async update(permission_id: string, updateProjectPermissionDto: UpdateProjectPermissionsDto) {
    const updatedPermission = await this.projectPermissionsModel.findByIdAndUpdate(
      permission_id,
      updateProjectPermissionDto,
      { new: true }, // Trả về dữ liệu sau khi cập nhật
    );

    if (!updatedPermission) throw new NotFoundException('Không tìm thấy quyền để cập nhật');
    return updatedPermission;
  }

  // ✅ Xóa quyền dựa trên permission_id
  async delete(permission_id: string) {
    const deletedPermission = await this.projectPermissionsModel.findByIdAndDelete(permission_id);
    if (!deletedPermission) throw new NotFoundException('Không tìm thấy quyền để xóa');
    return deletedPermission;
  }
}
