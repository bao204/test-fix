import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmployeeService } from 'src/employees/employees.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { TaskCategoryService } from 'src/taskcategories/taskCategories.service'; // Import TaskCategoryService
import { Task } from 'src/schemas/Task.schema';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { ProgressService } from 'src/progress/progress.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    private taskCategoryService: TaskCategoryService, // Inject TaskCategoryService
    private notificationService: NotificationService,
    private employeeService: EmployeeService,
    private progressService: ProgressService, 
  ) {}

  // ✅ Tạo mới Task
  async createTask(createTaskDto: CreateTaskDto) {
    const { taskCategory, notificationSent, taskAssignPerson, taskRecipient, progressId } = createTaskDto;

    if (taskCategory) {
      const taskCategoryExists = await this.taskCategoryService.getTaskCategoryById(taskCategory);
      if (!taskCategoryExists) {
        throw new BadRequestException('TaskCategory không tồn tại');
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

    if (progressId) {
      const progressExists = await this.progressService.getProgressById(progressId);
      if (!progressExists) {
        throw new BadRequestException('Progress không tồn tại');
      }
    }

    const newTask = new this.taskModel(createTaskDto);
    return await newTask.save();
  }

  // ✅ Lấy danh sách tất cả Task
  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel
      .find()
      .populate('taskCategory')
      .populate('notificationSent')
      .populate('taskAssignPerson')
      .populate('taskRecipient')
      .populate('progressId')
      .exec();
  }

  // ✅ Lấy Task theo ID
  async getTaskById(id:Types.ObjectId | string): Promise<Task> {
    const task = await this.taskModel
      .findById(id)
      .populate(['taskCategory', 'notificationSent', 'taskAssignPerson', 'taskRecipient', 'progressId']) // Populate progressName
      .exec();

    if (!task) {
      throw new NotFoundException('Task không tồn tại');
    }
    return task;
  }

  // ✅ Cập nhật Task
  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    if (!updatedTask) {
      throw new NotFoundException('Không tìm thấy Task để cập nhật');
    }
    return updatedTask;
  }

  // ✅ Xóa Task
  async deleteTask(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      throw new NotFoundException('Không tìm thấy Task để xóa');
    }
    return deletedTask;
  }
}
