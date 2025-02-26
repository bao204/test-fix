import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmployeeService } from 'src/employees/employees.service';
import { TaskService } from 'src/tasks/tasks.service';
import { ProgressService } from 'src/progress/progress.service';
import { Report } from 'src/schemas/Report.schema';
import { CreateReportDto } from './dto/CreateReport.dto';
import { UpdateReportDto } from './dto/UpdateReport.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name)
    private reportModel: Model<Report>,
    private employeeService: EmployeeService,
    private taskService: TaskService,
    private progressService: ProgressService,
  ) {}

  // ✅ Tạo mới Report
  async createReport(createReportDto: CreateReportDto) {
    const { id_employee, id_task, id_progress } = createReportDto;
  
    // Kiểm tra xem employee có tồn tại không
    if (id_employee) {
      const employeeExists = await this.employeeService.getEmployeeById(id_employee);
      if (!employeeExists) {
        throw new BadRequestException('Employee không tồn tại');
      }
    }
  
    // Kiểm tra xem task có tồn tại không, chỉ khi id_task có giá trị
    if (id_task) {
      const taskExists = await this.taskService.getTaskById(id_task);
      if (!taskExists) {
        throw new BadRequestException('Task không tồn tại');
      }
    }
  
    // Kiểm tra xem progress có tồn tại không, chỉ khi id_progress có giá trị
    if (id_progress) {
      const progressExists = await this.progressService.getProgressById(id_progress);
      if (!progressExists) {
        throw new BadRequestException('Progress không tồn tại');
      }
    }
  
    // Tạo và lưu report mới
    const newReport = new this.reportModel(createReportDto);
    return await newReport.save();
  }
  

  // ✅ Lấy danh sách tất cả Report
  async getAllReports(): Promise<Report[]> {
    return await this.reportModel
      .find()
      .populate('id_employee')
      .populate('id_task')
      .populate('id_progress')
      .exec();
  }

  // ✅ Lấy Report theo ID
  async getReportById(id: Types.ObjectId | string): Promise<Report> {
    const report = await this.reportModel
      .findById(id)
      .populate(['id_employee', 'id_task', 'id_progress'])
      .exec();

    if (!report) {
      throw new NotFoundException('Report không tồn tại');
    }
    return report;
  }

  // ✅ Cập nhật Report
  async updateReport(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    const updatedReport = await this.reportModel.findByIdAndUpdate(id, updateReportDto, { new: true });
    if (!updatedReport) {
      throw new NotFoundException('Không tìm thấy Report để cập nhật');
    }
    return updatedReport;
  }

  // ✅ Xóa Report
  async deleteReport(id: string): Promise<Report> {
    const deletedReport = await this.reportModel.findByIdAndDelete(id);
    if (!deletedReport) {
      throw new NotFoundException('Không tìm thấy Report để xóa');
    }
    return deletedReport;
  }
}
