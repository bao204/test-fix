import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Employee } from '../schemas/Employee.schema';
import { CreateEmployeeDto } from './dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from './dto/UpdateEmployee.dto';
import { DepartmentService } from 'src/departments/departments.service';
import { DesignationService } from 'src/designations/designations.service';
import { AccountService } from 'src/accounts/accounts.service';

import { Account } from 'src/schemas/Account.schema';
import { ProjectPermissions } from 'src/schemas/ProjectPermissions.schema';
import { ProjectPermissionsService } from 'src/projectpermissions/projectpermissions.service';
import { CreateProjectPermissionsDto } from 'src/projectpermissions/dto/CreateProjectPermission.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(ProjectPermissions.name) private projectPermissionsModel: Model<ProjectPermissions>,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private projectPermissionService:ProjectPermissionsService,
    private accountService: AccountService, 
  ) {}

  async createEmployee({ account, projectpermission, ...createEmployee }: CreateEmployeeDto): Promise<Employee> {
    let savedAccounts: Account | null = null;
    let savedProjectPermissions: Types.ObjectId[] = [];

    // Xử lý tài khoản nếu có
    if (account) {
        const createdAccounts = new this.accountModel(account);
        savedAccounts = await createdAccounts.save();
    }

    // Xử lý danh sách quyền trên dự án nếu có
    if (projectpermission && projectpermission.length > 0) {
        const createdProjectPermissions = await this.projectPermissionsModel.insertMany(projectpermission) as CreateProjectPermissionsDto[];

        // Chuyển đổi _id thành ObjectId và kiểm tra kiểu dữ liệu
        savedProjectPermissions = createdProjectPermissions
            .map(permission => ('_id' in permission ? permission._id : null))
            .filter((id): id is Types.ObjectId => id !== null);
    }

    const { department_id, designation_id } = createEmployee;

    // Kiểm tra department_id hợp lệ
    if (department_id) {
        const departmentExists = await this.departmentService.getDepartmentById(department_id);
        if (!departmentExists) {
            throw new NotFoundException('Department không tồn tại');
        }
    }

    // Kiểm tra designation_id hợp lệ
    if (designation_id) {
        const designationExists = await this.designationService.getDesignationById(designation_id);
        if (!designationExists) {
            throw new NotFoundException('Designation không tồn tại');
        }
    }

    // Tạo nhân viên với dữ liệu đầy đủ
    const newEmployee = new this.employeeModel({
        ...createEmployee,
        account: savedAccounts?._id || null,
        projectpermission: savedProjectPermissions.length > 0 ? savedProjectPermissions : [],
    });

    return newEmployee.save();
}

  // ✅ Lấy tất cả nhân viên
  async getEmployeeByUsernameOrEmail(username: string): Promise<Employee | null> {
    return this.employeeModel.findOne({ 
        $or: [
            { 'account.userName': username }, 
            { 'account.email': username }
        ]
    })
    .populate(['department_id', 'designation_id', 'account', 'team_id', 'projectpermission'])
    .exec();
}

     async getEmployees(): Promise<Employee[]> {
       return await this.employeeModel
     .find()
     .populate('department_id')
     .populate('designation_id')
     .populate('account')
     .populate('team_id')
     .populate('projectpermission')
     .exec();
     }
  // ✅ Lấy thông tin nhân viên theo ID
 
  async getEmployeeById(id: Types.ObjectId | string): Promise<Employee> {
    // Kiểm tra nếu id là ObjectId hợp lệ
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID không hợp lệ');
    }

    const employee = await this.employeeModel
        .findById(id)
        .populate(['department_id', 'designation_id', 'account', 'team_id', 'projectpermission'])
        .exec();

    if (!employee) {
        throw new NotFoundException('Nhân viên không tồn tại');
    }
    return employee;
}


  // ✅ Cập nhật thông tin nhân viên
  async updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
      employee_id,
      updateEmployeeDto,
      { new: true }
    ).populate('department_id')
     .populate('designation_id')
     .populate('team_id')
     .populate('account');


    if (!updatedEmployee) {
      throw new NotFoundException('Nhân viên không tồn tại');
    }

    return updatedEmployee;
  }

  // ✅ Xóa nhân viên
  async deleteEmployee(employee_id: string) {
    const deletedEmployee = await this.employeeModel.findByIdAndDelete(employee_id);
    if (!deletedEmployee) {
      throw new NotFoundException('Nhân viên không tồn tại');
    }
    return deletedEmployee;
  }

  async getEmployeeProfileFromToken(username: string): Promise<Employee> {
    const employee = await this.getEmployeeByUsernameOrEmail(username);
    
    if (!employee) {
      throw new UnauthorizedException('Không tìm thấy thông tin nhân viên');
    }

    return employee;
  }
}  