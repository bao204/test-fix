import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from 'src/schemas/Report.schema';
import { ReportService } from './reports.service';
import { ReportController } from './reports.controller';
import { EmployeeModule } from 'src/employees/employees.module';
import { TaskModule } from 'src/tasks/tasks.module';
import { ProgressModule } from 'src/progress/progress.module';
import { Employee, EmployeeSchema } from 'src/schemas/Employee.schema';
import { Task, TaskSchema } from 'src/schemas/Task.schema';
import { Progress, ProgressSchema } from 'src/schemas/Progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Report.name, schema: ReportSchema },
        { name: Employee.name, schema: EmployeeSchema },
        { name: Task.name, schema: TaskSchema },
        { name: Progress.name, schema: ProgressSchema },
    ]),
    EmployeeModule,
    TaskModule,
    ProgressModule,
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
