import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmployeeService } from 'src/employees/employees.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { ProjectCategoryService } from 'src/projectcategories/projectCategories.service';
import { Project } from 'src/schemas/Project.schema';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
    private projectCategoryService: ProjectCategoryService,
    private notificationService: NotificationService,
    private employeeService: EmployeeService,
  ) {}

  // ✅ Tạo mới Project
  async createProject(createProjectDto: CreateProjectDto) {
    const { projectCategory, notificationSent, assignedPerson } = createProjectDto;

    if (projectCategory) {
      const projectCategoryExists = await this.projectCategoryService.getProjectCategoryById(projectCategory);
      if (!projectCategoryExists) {
        throw new BadRequestException('ProjectCategory không tồn tại');
      }
    }

    if (notificationSent) {
      const notificationExists = await this.notificationService.getNotificationById(notificationSent);
      if (!notificationExists) {
        throw new BadRequestException('Notification không tồn tại');
      }
    }

    if (assignedPerson) {
      const assignedPersonExists = await this.employeeService.getEmployeeById(assignedPerson);
      if (!assignedPersonExists) {
        throw new BadRequestException('Employee không tồn tại');
      }
    }

    const newProject = new this.projectModel(createProjectDto);
    return await newProject.save();
  }
  async getAllProjects(): Promise<any[]> {
    return await this.projectModel.aggregate([
      {
        $lookup: {
          from: 'progresses', 
          localField: '_id',
          foreignField: 'projectid',
          as: 'progressList'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'projectCategory',
          foreignField: '_id',
          as: 'projectCategory'
        }
      },
      {
        $lookup: {
          from: 'notifications',
          localField: 'notificationSent',
          foreignField: '_id',
          as: 'notificationSent'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'assignedPerson',
          foreignField: '_id',
          as: 'assignedPerson'
        }
      }
    ]).exec();
  }
  
  // ✅ Lấy Project theo ID
  async getProjectById(id:Types.ObjectId | string): Promise<Project> {
    const project = await this.projectModel
      .findById(id)
      .populate(['projectCategory', 'notificationSent', 'assignedPerson'])
      .exec();
  
    if (!project) {
      throw new NotFoundException('Project không tồn tại');
    }
    return project;
  }
  

  // ✅ Cập nhật Project
  async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });
    if (!updatedProject) {
      throw new NotFoundException('Không tìm thấy Project để cập nhật');
    }
    return updatedProject;
  }

  // ✅ Xóa Project
  async deleteProject(id: string): Promise<Project> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id);
    if (!deletedProject) {
      throw new NotFoundException('Không tìm thấy Project để xóa');
    }
    return deletedProject;
  }
}
