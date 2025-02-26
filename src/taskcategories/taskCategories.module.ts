import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { TaskCategory, TaskCategorySchema } from 'src/schemas/TaskCategory.schema';

import { TaskCategoryService } from './taskCategories.service';
import { TaskCategoryController } from './taskCategories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
        name: TaskCategory.name, schema: TaskCategorySchema
        }
    ])],
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService],
  exports: [TaskCategoryService],
})
export class TaskCategoryModule {}
