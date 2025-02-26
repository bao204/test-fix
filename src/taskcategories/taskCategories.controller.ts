import { Controller, Get, Post, Body, Param, Delete, HttpException, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import mongoose from 'mongoose';
import { TaskCategoryService } from './taskCategories.service';
import { CreateTaskCategoryDto } from './dto/CreateTaskCategory.dto';
import { UpdateTaskCategoryDto } from './dto/UpdateTaskCategory.dto';


@Controller('taskcategories')
export class TaskCategoryController {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @Post()
  async create(@Body() createTaskCategoryDto: CreateTaskCategoryDto) {
    return this.taskCategoryService.create(createTaskCategoryDto);
  }

  @Get()
  async getTaskCategory() {
    return this.taskCategoryService.getTaskCategory();
  }

  @Get(':id')
  async getTaskCategoryById(@Param('id')id:string)
  {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new HttpException('TaskCategory not found',404);
    const findTaskCategory = await this.taskCategoryService.getTaskCategoryById(id);
    if(!findTaskCategory)throw new HttpException('TaskCategory not found',404);
    return findTaskCategory; 
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateTaskCategory(@Param('id') id:string, @Body() updateTaskCategoryDto: UpdateTaskCategoryDto){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new HttpException('Invalid ID',404);
    const updateTaskCategory = await this.taskCategoryService.updateTaskCategory(id, updateTaskCategoryDto);
    if(!updateTaskCategory) throw new HttpException('TaskCategory not found',404);
    return updateTaskCategory;
  }

  @Delete(':id')
  async deleteTaskCategory(@Param('id') id:string)
  {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new HttpException('Invalid Id',404);
    const deleteTaskCategory = await this.taskCategoryService.deleteTaskCategory(id);
    if(!deleteTaskCategory) throw new HttpException('TaskCategory not found',404);
    return deleteTaskCategory;
  }
}
