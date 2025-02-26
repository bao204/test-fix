
import { Controller, Get, Post, Body, Param, Delete, HttpException, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { DepartmentService } from './departments.service';
import { CreateDepartmentDto } from './dto/CreateDepartment.dto';
import mongoose from 'mongoose';
import { UpdateDepartmentDto } from './dto/UpdateDepartment.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  async getDepartment() {
    return this.departmentService.getDepartment();
  }

  @Get(':id')
async getDepartmentById(@Param('id')id:string)
{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new HttpException('Department not found',404);
            const findDepartment = await this.departmentService.getDepartmentById(id);
            if(!findDepartment)throw new HttpException('Department not found',404);
            return findDepartment; 
  }

  @Patch(':id')
    // Pipes là các lớp xử lý dữ liệu đầu vào và đầu ra của HTTP request.
    @UsePipes(new ValidationPipe())
    async updateDepartment(@Param('id') id:string,@Body()updateDepartmentDto:UpdateDepartmentDto){
        const isValid =mongoose.Types.ObjectId.isValid(id);
        if(!isValid)throw new HttpException('Invalid ID',404);
        const updateDepartment=await this.departmentService.updateDepartment(id,updateDepartmentDto);
        if(!updateDepartment) throw new HttpException('User not found',404);
        return updateDepartment;
     }

  @Delete(':id')
    async deleteDepartment(@Param('id') id:string)
    {
        const isValid =mongoose.Types.ObjectId.isValid(id);
        if(!isValid)throw new HttpException('Invalid Id',404);
        const deleteDepartment = await this.departmentService.deleteDepartment(id);
        if(!deleteDepartment) throw new HttpException('User not found',404);
        return deleteDepartment;
    }
}
