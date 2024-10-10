import { Inject, Injectable } from '@nestjs/common'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/resources/users/entities/user.entity'
import { Repository } from 'typeorm'
import { IGetUserAuthInfoRequest } from 'src/guards/auth/auth.interface'
import { Team } from './entities/team.entity'
import { Role } from 'src/guards/roles/role.enum'

@Injectable()
export class TeamsService {
  constructor(
    @Inject(REQUEST)
    private readonly request: IGetUserAuthInfoRequest,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  private readonly findOptions = {
    relations: {
      manager: true,
      members: true,
    },
    where: [
      {
        id: undefined,
        manager: undefined,
      },
      {
        id: undefined,
        members: undefined,
      },
    ],
  }

  create(createTeamDto: CreateTeamDto) {
    const team = this.teamRepository.save(createTeamDto)

    return team
  }

  findAll() {
    const { user } = this.request

    const findOptions = this.findOptions

    if (user.role !== Role.Admin) {
      findOptions.where[0].manager = { id: user.id }
      findOptions.where[1].members = { id: user.id }
    }

    const teams = this.teamRepository.find(findOptions)

    return teams
  }

  findOne(id: number) {
    const { user } = this.request

    const findOptions = this.findOptions

    findOptions.where[0].id = id
    findOptions.where[1].id = id

    if (user.role !== Role.Admin) {
      findOptions.where[0].manager = { id: user.id }
      findOptions.where[1].members = { id: user.id }
    }

    const team = this.teamRepository.findOne(findOptions)

    return team
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    let team = await this.teamRepository.findOne({ where: { id } })

    team = { ...team, ...updateTeamDto }

    const uTeam = this.teamRepository.save(team)

    return uTeam
  }

  remove(id: number) {
    return `This action removes a #${id} team`
  }
}
