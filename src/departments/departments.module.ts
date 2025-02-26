import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from 'src/schemas/Department.schema';
import { DepartmentController } from './departments.controller';
import { DepartmentService } from './departments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
        name: Department.name, schema: DepartmentSchema
        }
    ])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
