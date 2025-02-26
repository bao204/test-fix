import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmployeeService } from 'src/employees/employees.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { ProgressCategoryService } from 'src/progresscategories/progressCategories.service';
import { ProjectService } from 'src/projects/projects.service';  // Import ProjectService
import { Progress } from 'src/schemas/Progress.schema';
import { CreateProgressDto } from './dto/CreateProgress.dto';
import { UpdateProgressDto } from './dto/UpdateProgress.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name)
    private progressModel: Model<Progress>,
    private progressCategoryService: ProgressCategoryService,
    private notificationService: NotificationService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,  // Inject ProjectService
  ) {}

  // ✅ Tạo mới Progress
  async createProgress(createProgressDto: CreateProgressDto) {
    const { progressCategory, notificationSent, taskAssignPerson, taskRecipient, projectid } = createProgressDto;

    if (progressCategory) {
      const progressCategoryExists = await this.progressCategoryService.getProgressCategoryById(progressCategory);
      if (!progressCategoryExists) {
        throw new BadRequestException('ProgressCategory không tồn tại');
      }
    }

    if (notificationSent) {
      const notificationExists = await this.notificationService.getNotificationById(notificationSent);
      if (!notificationExists) {
        throw new BadRequestException('Notification không tồn tại');
      }
    }

    if (taskAssignPerson) {
      const taskAssignPersonExists = await this.employeeService.getEmployeeById(taskAssignPerson);
      if (!taskAssignPersonExists) {
        throw new BadRequestException('Employee không tồn tại');
      }
    }

    if (taskRecipient) {
      const taskRecipientExists = await this.employeeService.getEmployeeById(taskRecipient);
      if (!taskRecipientExists) {
        throw new BadRequestException('Employee không tồn tại');
      }
    }

    if (projectid) {
      const projectExists = await this.projectService.getProjectById(projectid);  // Check if the project exists
      if (!projectExists) {
        throw new BadRequestException('Project không tồn tại');
      }
    }

    const newProgress = new this.progressModel(createProgressDto);
    return await newProgress.save();
  }

  // ✅ Lấy danh sách tất cả Progress
  async getAllProgresses(): Promise<Progress[]> {
    return await this.progressModel
      .find()
      .populate('progressCategory')
      .populate('notificationSent')
      .populate('taskAssignPerson')
      .populate('taskRecipient')
      .populate('projectid')  // Populate projectid
      .exec();
  }

  // ✅ Lấy Progress theo ID
  async getProgressById(id:Types.ObjectId | string): Promise<Progress> {
    const progress = await this.progressModel
      .findById(id)
      .populate(['progressCategory', 'notificationSent', 'taskAssignPerson', 'taskRecipient', 'projectid'])  // Populate projectid
      .exec();

    if (!progress) {
      throw new NotFoundException('Progress không tồn tại');
    }
    return progress;
  }

  // ✅ Cập nhật Progress
  async updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress> {
    const updatedProgress = await this.progressModel.findByIdAndUpdate(id, updateProgressDto, { new: true });
    if (!updatedProgress) {
      throw new NotFoundException('Không tìm thấy Progress để cập nhật');
    }
    return updatedProgress;
  }

  // ✅ Xóa Progress
  async deleteProgress(id: string): Promise<Progress> {
    const deletedProgress = await this.progressModel.findByIdAndDelete(id);
    if (!deletedProgress) {
      throw new NotFoundException('Không tìm thấy Progress để xóa');
    }
    return deletedProgress;
  }
}
