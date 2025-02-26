import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from 'src/schemas/Team.schema';
import { EmployeeService } from 'src/employees/employees.service';
import { ProjectService } from 'src/projects/projects.service';
import { CreateTeamDto } from './dto/CreateTeam.dto';
import { UpdateTeamDto } from './dto/UpdateTeam.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) 
    private teamModel: Model<Team>,
    private employeeService: EmployeeService,
    private projectService: ProjectService
  ) {}

  // ✅ Tạo nhóm mới
  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const { teamLead, projectid } = createTeamDto;
    
    if (teamLead) {
      const employeeExists = await this.employeeService.getEmployeeById(teamLead);
      if (!employeeExists) {
        throw new BadRequestException('Employee không tồn tại');
      }
    }
    
    if (projectid) {
      const projectExists = await this.projectService.getProjectById(projectid);
      if (!projectExists) {
        throw new BadRequestException('Project không tồn tại');
      }
    }
    
    const newTeam = new this.teamModel(createTeamDto);
    return await newTeam.save();
  }

  // ✅ Lấy danh sách tất cả nhóm
    async getAll(): Promise<Team[]> {
     return await this.teamModel
   .find()
   .populate('teamLead')
   .populate('projectid')
   .exec();
   }

  // ✅ Lấy nhóm theo ID
 async getTeamById(id: string): Promise<Team> {
    const team = await this.teamModel
      .findById(id)
      .populate(['teamLead', 'projectid'])
      .exec();
  
    if (!team) {
      throw new NotFoundException('Team không tồn tại');
    }
    return team;
  }

// ✅ Cập nhật quyền dựa trên permission_id
  async update(team_id: string, updateTeamDto: UpdateTeamDto) {
    const updatedTeam = await this.teamModel.findByIdAndUpdate(
      team_id,
      updateTeamDto,
      { new: true }, // Trả về dữ liệu sau khi cập nhật
    );

    if (!updatedTeam) throw new NotFoundException('Không tìm thấy quyền để cập nhật');
    return updatedTeam;
  }

  // ✅ Xóa nhóm
  async deleteTeam(id: string): Promise<{ message: string }> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      throw new NotFoundException('Team không tồn tại');
    }
    
    await this.teamModel.findByIdAndDelete(id);
    return { message: 'Team đã được xóa thành công' };
  }
}
