import { Controller, Get, Post, Body, Param, Delete, HttpException, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { DesignationService } from './designations.service';
import { CreateDesignationDto } from './dto/CreateDesignation.dto';
import mongoose from 'mongoose';
import { UpdateDesignationDto } from './dto/UpdateDesignation.dto';

@Controller('designations')
export class DesignationController {
  constructor(private readonly designationService: DesignationService) {}

  @Post()
  async create(@Body() createDesignationDto: CreateDesignationDto) {
    return this.designationService.create(createDesignationDto);
  }

  @Get()
  async getDesignation() {
    return this.designationService.getDesignation();
  }

  @Get(':id')
  async getDesignationById(@Param('id') id: string) {
   const isValid = mongoose.Types.ObjectId.isValid(id);
      if(!isValid)throw new HttpException('Designation not found',404);
              const findDesignation = await this.designationService.getDesignationById(id);
              if(!findDesignation)throw new HttpException('Designation not found',404);
              return findDesignation; 
    }

  @Patch(':id')
    // Pipes là các lớp xử lý dữ liệu đầu vào và đầu ra của HTTP request.
    @UsePipes(new ValidationPipe())
    async updateDesignation(@Param('id') id:string,@Body()updateDesignationDto:UpdateDesignationDto){
        const isValid =mongoose.Types.ObjectId.isValid(id);
        if(!isValid)throw new HttpException('Invalid ID',404);
        const updateDesignation=await this.designationService.updateDesignation(id,updateDesignationDto);
        if(!updateDesignation) throw new HttpException('User not found',404);
        return updateDesignation;
     }

  @Delete(':id')
 async deleteDesignation(@Param('id') id:string)
     {
         const isValid =mongoose.Types.ObjectId.isValid(id);
         if(!isValid)throw new HttpException('Invalid Id',404);
         const deleteDesignation = await this.designationService.deleteDesignation(id);
         if(!deleteDesignation) throw new HttpException('User not found',404);
         return deleteDesignation;
     }
}
