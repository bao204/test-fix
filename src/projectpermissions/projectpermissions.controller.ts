
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { CreateProjectPermissionsDto } from './dto/CreateProjectPermission.dto';
import { ProjectPermissionsService } from './projectpermissions.service';
import { UpdateProjectPermissionsDto } from './dto/UpdateProjectPermission.dto';


@Controller('projectpermissions')
export class ProjectPermissionsController {
  constructor(private readonly projectpermissionService: ProjectPermissionsService) {}

  // Tạo mới một 
  @Post()
  async createProjectPermission(
    @Body() createProjectPermissionDto: CreateProjectPermissionsDto
  ) {
    const newProjectPermission = await this.projectpermissionService.createProjectPermission(createProjectPermissionDto);
    return { success: true, data: newProjectPermission };  
  }
    // Lấy danh sách nhân viên
    @Get()
    async getAll() {
      return this.projectpermissionService.getAll();  // Lấy danh sách nhân viên
    }
  
    // Lấy thông  theo ID
    @Get(':id')
    async getByEmployee(@Param('id') id: string) {
      return this.projectpermissionService.getByEmployee(id);
    }
  
    // Cập nhật thông tin 
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProjectPermissionDto: UpdateProjectPermissionsDto) {
      return this.projectpermissionService.update(id, updateProjectPermissionDto);
    }
  
    // Xóa nhân viên
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.projectpermissionService.delete(id);
    }

 
}
