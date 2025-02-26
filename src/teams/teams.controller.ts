import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { CreateTeamDto } from './dto/CreateTeam.dto';
import { TeamsService } from './teams.service';
import { UpdateTeamDto } from './dto/UpdateTeam.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // Tạo mới một nhóm
  @Post()
  async createTeam(@Body() createTeamDto: CreateTeamDto) {
    const newTeam = await this.teamsService.createTeam(createTeamDto);
    return { success: true, data: newTeam };  
  }

  // Lấy danh sách nhóm
  @Get()
  async getAll() {
    return this.teamsService.getAll();
  }

  // Lấy nhóm theo ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.teamsService.getTeamById(id);
  }

  // Cập nhật thông tin nhóm
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  // Xóa nhóm
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.teamsService.deleteTeam(id);
  }
}
