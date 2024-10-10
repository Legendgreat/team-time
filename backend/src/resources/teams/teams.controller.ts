import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { TeamsService } from './teams.service'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { Roles } from 'src/guards/roles/roles.decorator'
import { Role } from 'src/guards/roles/role.enum'

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto)
  }

  @Get()
  findAll() {
    return this.teamsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id)
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto)
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id)
  }
}
