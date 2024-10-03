/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Time } from './time.entity'
import { DataSource, Repository, UpdateResult } from 'typeorm'
import { UUID } from 'crypto'
import { CreateTimeDto } from './dto/time.dto'
import { Block } from '../blocks/block.entity'

@Injectable()
export class TimesService {
  constructor(
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>,
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
  ) {}

  private readonly times: Time[] = []

  async create(dto: CreateTimeDto): Promise<Time> {
    const { userId } = dto

    let time = new Time()

    time = { userId, ...time }

    const newTime = await this.timeRepository.save(time)

    return newTime
  }

  async findAll(): Promise<Time[]> {
    const qb = this.timeRepository
      .createQueryBuilder('time')
      .select(['time'])
      .leftJoin('time.blocks', 'blocks')
      .addSelect([
        'blocks.title',
        'blocks.description',
        'blocks.duration',
        'blocks.start',
      ])
    const times = await qb.getMany()
    return times
  }

  async findOne(slug: any): Promise<Time> {
    const id = slug
    const qb = this.timeRepository
      .createQueryBuilder('time')
      .select(['time'])
      .leftJoin('time.blocks', 'blocks')
      .addSelect([
        'blocks.title',
        'blocks.description',
        'blocks.duration',
        'blocks.start',
      ])
      .where('time.id = :id', id)

    const time = await qb.getOneOrFail().catch((err) => {
      throw new HttpException(err, HttpStatus.NOT_FOUND)
    })

    return time
  }

  async update(slug: any, body: any): Promise<Time> {
    const id = slug
    const { date, blocks, status, managerCommentary } = body

    let time = await this.timeRepository.findOneBy(id)
    time = { ...time, date, status, managerCommentary }

    const updatedTime = await this.timeRepository.save(time)
    return updatedTime
  }

  async deleteOne(slug: any): Promise<UpdateResult[]> {
    const id = slug

    // Check if time exists in database
    const time = await this.timeRepository.findOneBy(id)

    const blocks = await this.blockRepository.find({ where: { time: id } })

    let deletedTime: UpdateResult
    let deletedBlocks: UpdateResult

    if (time) {
      deletedTime = await this.timeRepository.softDelete(id)
    }

    if (blocks.length > 0) {
      deletedBlocks = await this.blockRepository.softDelete(
        blocks.map((block) => block.id),
      )
    }

    return [deletedTime, deletedBlocks]
  }
}
