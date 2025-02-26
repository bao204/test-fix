import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ProgressCategory, ProgressCategorySchema } from 'src/schemas/ProgressCategory.schema';

import { ProgressCategoryService } from './progressCategories.service';
import { ProgressCategoryController } from './progressCategories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
        name: ProgressCategory.name, schema: ProgressCategorySchema
        }
    ])],
  controllers: [ProgressCategoryController],
  providers: [ProgressCategoryService],
  exports: [ProgressCategoryService],
})
export class ProgressCategoryModule {}
