
import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';



@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Tạo mới một 
  @Post()
  @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('projectImage', {
        storage: diskStorage({
            destination: './uploads/projectImage', // Đường dẫn lưu avatar
            filename: (req, file, cb) => {
                const fileExt = path.extname(file.originalname); // Lấy đuôi file
                const filename = `${uuidv4()}${fileExt}`; // Đặt tên file là uuid
                cb(null, filename);
            }
        })
    }))
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File 
  ) {
    if (file) {
      createProjectDto.projectImage = `/uploads/projectImage/${file.filename}`;
    }
    
    const newProject = await this.projectService.createProject(createProjectDto);
    return { success: true, data: newProject };
  }

    // Lấy danh sách nhân viên
    @Get()
    async getAllProjects() {
      return this.projectService.getAllProjects();  // Lấy danh sách nhân viên
    }
  
    // Lấy thông  theo ID
    @Get(':id')
    async getProjectById(@Param('id') id: string) {
      return this.projectService.getProjectById(id);
    }
  
    // Cập nhật thông tin 
    @Patch(':id')
    @UseInterceptors(FileInterceptor('projectImage', {
      storage: diskStorage({
        destination: './uploads/projectImage',
        filename: (req, file, cb) => {
          const fileExt = path.extname(file.originalname);
          const filename = `${uuidv4()}${fileExt}`;
          cb(null, filename);
        }
      })
    }))
    async updateProject(
      @Param('id') id: string,
      @Body() updateProjectDto: UpdateProjectDto,
      @UploadedFile() file?: Express.Multer.File
    ) {
      if (file) {
        updateProjectDto.projectImage = `/uploads/projectImage/${file.filename}`;
      }
      return this.projectService.updateProject(id, updateProjectDto);
    }
    
  
    // Xóa nhân viên
    @Delete(':id')
    async deleteProject(@Param('id') id: string) {
      return this.projectService.deleteProject(id);
    }
}
