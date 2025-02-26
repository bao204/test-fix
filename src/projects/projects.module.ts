import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schemas/Project.schema';
import { ProjectService } from './projects.service';
import { ProjectController } from './projects.controller';
import { ProjectCategoryModule } from 'src/projectcategories/projectCategories.module';
import { NotificationModule } from 'src/notifications/notifications.module';
import { EmployeeModule } from 'src/employees/employees.module';
import { Employee, EmployeeSchema } from 'src/schemas/Employee.schema';
import { NotificationSent, NotificationSentSchema } from 'src/schemas/NotificationSent.schema';
import { ProjectCategory, ProjectCategorySchema } from 'src/schemas/ProjectCategory.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
     ServeStaticModule.forRoot({
          rootPath: 'uploads',
          serveRoot: '/uploads',
        }),
    MongooseModule.forFeature([
        { name: Project.name, schema: ProjectSchema },
        { name: Employee.name, schema: EmployeeSchema },
        { name: NotificationSent.name, schema: NotificationSentSchema },
        { name: ProjectCategory.name, schema: ProjectCategorySchema },
    ]),
    ProjectCategoryModule,
    NotificationModule,
    EmployeeModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
