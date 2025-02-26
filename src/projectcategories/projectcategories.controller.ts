
import { Controller, Get, Post, Body, Param, Delete, HttpException, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import mongoose from 'mongoose';
import { ProjectCategoryService } from './projectCategories.service';
import { CreateProjectCategoryDto } from './dto/CreateProjectCategory.dto';
import { UpdateProjectCategoryDto } from './dto/UpdateProjectCategory.dto';


@Controller('projectcategories')
export class ProjectCategoryController {
  constructor(private readonly projectCategoryService: ProjectCategoryService) {}

  @Post()
  async create(@Body() createProjectCategoryDto: CreateProjectCategoryDto) {
    return this.projectCategoryService.create(createProjectCategoryDto);
  }

  @Get()
  async getProjectCategory() {
    return this.projectCategoryService.getProjectCategory();
  }

  @Get(':id')
async getProjectCategoryById(@Param('id')id:string)
{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new HttpException('ProjectCategory not found',404);
            const findProjectCategory = await this.projectCategoryService.getProjectCategoryById(id);
            if(!findProjectCategory)throw new HttpException('ProjectCategory not found',404);
            return findProjectCategory; 
  }

  @Patch(':id')
    // Pipes là các lớp xử lý dữ liệu đầu vào và đầu ra của HTTP request.
    @UsePipes(new ValidationPipe())
    async updateProjectCategory(@Param('id') id:string,@Body()updateProjectCategoryDto:UpdateProjectCategoryDto){
        const isValid =mongoose.Types.ObjectId.isValid(id);
        if(!isValid)throw new HttpException('Invalid ID',404);
        const updateProjectCategory=await this.projectCategoryService.updateProjectCategory(id,updateProjectCategoryDto);
        if(!updateProjectCategory) throw new HttpException('User not found',404);
        return updateProjectCategory;
     }

  @Delete(':id')
    async deleteProjectCategory(@Param('id') id:string)
    {
        const isValid =mongoose.Types.ObjectId.isValid(id);
        if(!isValid)throw new HttpException('Invalid Id',404);
        const deleteProjectCategory = await this.projectCategoryService.deleteProjectCategory(id);
        if(!deleteProjectCategory) throw new HttpException('User not found',404);
        return deleteProjectCategory;
    }
}
