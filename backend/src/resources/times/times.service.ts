import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { BlockService } from 'src/resources/blocks/block.service'
import { IGetUserAuthInfoRequest } from 'src/guards/auth/auth.interface'
import { Role } from 'src/guards/roles/role.enum'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Block } from 'src/resources/blocks/entities/block.entity'
import { Time } from './entities/time.entity'

@Injectable({ scope: Scope.REQUEST })
export class TimesService {
  constructor(
    @Inject(REQUEST)
    private readonly request: IGetUserAuthInfoRequest,
    @Inject(forwardRef(() => BlockService))
    private blocksService: BlockService,
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>,
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
  ) {}

  private readonly findOptions = {
    relations: {
      blocks: true,
    },
    where: {
      id: undefined,
      user: undefined,
    },
  }

  async create(): Promise<Time> {
    const { user } = this.request

    let time = new Time()

    time = { user, ...time }

    const newTime = await this.timeRepository.save(time)

    return newTime
  }

  async findAll(): Promise<Time[]> {
    const { user } = this.request

    const findOptions = this.findOptions

    if (user.role !== Role.Admin) {
      findOptions.where.user = { id: user.id }
    }

    const times = this.timeRepository.find(findOptions)

    return times
  }

  async findOne(slug: any): Promise<Time> {
    const { id } = slug

    const { user } = this.request

    const findOptions = this.findOptions

    findOptions.where.id = id

    if (user.role !== Role.Admin) {
      findOptions.where.user = { id: user.id }
    }

    const time = this.timeRepository.findOne(findOptions)

    return time
  }

  async update(slug: any, body: any): Promise<Time | Block[]> {
    const { id } = slug
    const { user } = this.request
    const { date, blocks, status, managerCommentary } = body
    let updatedTime: Time, updatedBlocks: Block[]

    const findOptions = this.findOptions

    findOptions.where.id = id

    if (user.role !== Role.Admin) {
      findOptions.where.user = { id: user.id }
    }

    let time = await this.timeRepository.findOne(findOptions)
    if (date || status || managerCommentary) {
      time = { ...time, date, status, managerCommentary }
      updatedTime = await this.timeRepository.save(time)
    }
    if (blocks) {
      updatedBlocks = []
      for (const block of blocks) {
        const updatedBlock = await this.blocksService.updateOrCreate(
          id.toString(),
          block,
        )

        updatedBlocks.push(updatedBlock)
      }
    }

    if (updatedTime) return updatedTime
    if (updatedBlocks) return updatedBlocks
  }

  async deleteOne(slug: any): Promise<UpdateResult[]> {
    const { id } = slug
    const { user } = this.request

    const findOptions = this.findOptions

    findOptions.where.id = id

    if (user.role !== Role.Admin) {
      findOptions.where.user = { id: user.id }
    }

    // Check if time exists in database
    const time = await this.timeRepository.findOne(findOptions)

    const blocks = await this.blockRepository.find({ where: { time: time } })

    let deletedTime: UpdateResult
    let deletedBlocks: UpdateResult

    if (time) {
      deletedTime = await this.timeRepository.softDelete({ id })
    }

    if (blocks.length > 0) {
      deletedBlocks = await this.blockRepository.softDelete(
        blocks.map((block) => block.id),
      )
    }

    return [deletedTime, deletedBlocks]
  }

  async deleteOneBlock(slug: any): Promise<DeleteResult> {
    const { id } = slug
    const { user } = this.request

    const deletedBlock = await this.blocksService.deleteOne(user, id)

    return deletedBlock
  }
}
