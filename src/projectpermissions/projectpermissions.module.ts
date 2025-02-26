import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectPermissions, ProjectPermissionsSchema } from 'src/schemas/ProjectPermissions.schema';
import { ProjectPermissionsService } from './projectpermissions.service';
import { ProjectPermissionsController } from './projectpermissions.controller';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectPermissions.name, schema: ProjectPermissionsSchema },
    
    ]),
   
  
  ],
  providers: [ProjectPermissionsService],
  controllers: [ProjectPermissionsController],
  exports: [ProjectPermissionsService]
})
export class ProjectPermissionsModule {}
