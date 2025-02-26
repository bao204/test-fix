import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ProjectCategory, ProjectCategorySchema } from 'src/schemas/ProjectCategory.schema';
import { ProjectCategoryController } from './projectcategories.controller';
import { ProjectCategoryService } from './projectCategories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
        name: ProjectCategory.name, schema: ProjectCategorySchema
        }
    ])],
  controllers: [ProjectCategoryController],
  providers: [ProjectCategoryService],
  exports: [ProjectCategoryService],
})
export class ProjectCategoryModule {}
