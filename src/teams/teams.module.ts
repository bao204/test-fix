import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from 'src/employees/employees.module';
import { Team, TeamSchema } from 'src/schemas/Team.schema';
import { ProjectModule } from 'src/projects/projects.module';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Team.name, schema: TeamSchema },
    
    ]),
    EmployeeModule, // Import vào đây
    ProjectModule
  
  ],
  providers: [TeamsService],
  controllers: [TeamsController],
})
export class TeamModule {}
