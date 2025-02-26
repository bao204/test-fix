import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from './dto/UpdateEmployee.dto';
import { EmployeeService } from './employees.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // Endpoint lấy profile từ token không cần guard
  @Get('profile')
  @ApiOperation({ summary: 'Get current employee profile from token' })
  async getProfile(@Request() req) {
    // Lấy username từ request
    const username = req.user?.username;
    return this.employeeService.getEmployeeProfileFromToken(username);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create new employee' })
  @UseInterceptors(FileInterceptor('employeeProfile', {
      storage: diskStorage({
          destination: './uploads/employeeProfile',
          filename: (req, file, cb) => {
              const fileExt = path.extname(file.originalname);
              const filename = `${uuidv4()}${fileExt}`;
              cb(null, filename);
          }
      })
  }))
  async createEmployee(
      @Body() createEmployeeDto: CreateEmployeeDto,
      @UploadedFile() file: Express.Multer.File
  ) {
      if (file) {
          createEmployeeDto.employeeProfile = `/uploads/employeeProfile/${file.filename}`;
      }
  
      const newEmployee = await this.employeeService.createEmployee(createEmployeeDto);
      return { success: true, data: newEmployee };  
  }
  
  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  async getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee by ID' })
  async getEmployeeById(@Param('id') id: string) {
    return this.employeeService.getEmployeeById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update employee' })
  @UseInterceptors(FileInterceptor('employeeProfile', {
      storage: diskStorage({
          destination: './uploads/employeeProfile',
          filename: (req, file, cb) => {
              const fileExt = path.extname(file.originalname);
              const filename = `${uuidv4()}${fileExt}`;
              cb(null, filename);
          }
      })
  }))
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() file: Express.Multer.File
  ) {
      if (file) {
          updateEmployeeDto.employeeProfile = `/uploads/employeeProfile/${file.filename}`;
      }
      return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete employee' })
  async deleteEmployee(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}