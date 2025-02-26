import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { Account, AccountSchema } from 'src/schemas/Account.schema';
import { Employee, EmployeeSchema } from 'src/schemas/Employee.schema';
import { EmployeeService } from './employees.service';
import { EmployeeController } from './employees.controller';
import { DepartmentModule } from 'src/departments/departments.module';
import { DesignationModule } from 'src/designations/designations.module';
import { AccountModule } from 'src/accounts/accounts.module';
import { ProjectPermissions, ProjectPermissionsSchema } from 'src/schemas/ProjectPermissions.schema';
import { ProjectPermissionsModule } from 'src/projectpermissions/projectpermissions.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'uploads',
      serveRoot: '/uploads',
    }),
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Account.name, schema: AccountSchema },
      { name: ProjectPermissions.name, schema: ProjectPermissionsSchema },
    ]),
    DepartmentModule,
    DesignationModule,
    AccountModule,
    ProjectPermissionsModule
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}