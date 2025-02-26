import { Controller, Get, Post, Body, Param, Delete, HttpException, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import mongoose from 'mongoose';
import { ProgressCategoryService } from './progressCategories.service';
import { CreateProgressCategoryDto } from './dto/CreatProgressCategory.dto';
import { UpdateProgressCategoryDto } from './dto/UpdateProgressCategoryDto ';

@Controller('progresscategories')
export class ProgressCategoryController {
  constructor(private readonly progressCategoryService: ProgressCategoryService) {}

  @Post()
  async create(@Body() createProgressCategoryDto: CreateProgressCategoryDto) {
    return this.progressCategoryService.create(createProgressCategoryDto);
  }

  @Get()
  async getProgressCategory() {
    return this.progressCategoryService.getProgressCategory();
  }

  @Get(':id')
  async getProgressCategoryById(@Param('id')id:string)
  {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new HttpException('ProgressCategory not found',404);
    const findProgressCategory = await this.progressCategoryService.getProgressCategoryById(id);
    if(!findProgressCategory)throw new HttpException('ProgressCategory not found',404);
    return findProgressCategory; 
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateProgressCategory(@Param('id') id:string, @Body() updateProgressCategoryDto: UpdateProgressCategoryDto){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new HttpException('Invalid ID',404);
    const updateProgressCategory = await this.progressCategoryService.updateProgressCategory(id, updateProgressCategoryDto);
    if(!updateProgressCategory) throw new HttpException('ProgressCategory not found',404);
    return updateProgressCategory;
  }

  @Delete(':id')
  async deleteProgressCategory(@Param('id') id:string)
  {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new HttpException('Invalid Id',404);
    const deleteProgressCategory = await this.progressCategoryService.deleteProgressCategory(id);
    if(!deleteProgressCategory) throw new HttpException('ProgressCategory not found',404);
    return deleteProgressCategory;
  }
}