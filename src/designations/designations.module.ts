import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Designation, DesignationSchema } from 'src/schemas/Designation.schema';
import { DesignationController } from './designations.controller';
import { DesignationService } from './designations.service';


@Module({
  imports: [
    MongooseModule.forFeature([
        {
        name: Designation.name, schema: DesignationSchema
        }
    ])],
  controllers: [DesignationController],
  providers: [DesignationService],
  exports: [DesignationService ,MongooseModule ],
})
export class DesignationModule {}
