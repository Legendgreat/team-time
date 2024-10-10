/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from 'src/guards/roles/role.enum'
import { Time } from 'src/resources/times/entities/time.entity'
import { User } from 'src/resources/users/entities/user.entity'
import { DeleteResult, Repository } from 'typeorm'
import { Block } from './entities/block.entity'

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>,
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
  ) {}

  private readonly findOptions = {
    relations: {
      time: true,
    },
    where: {
      id: undefined,
      time: {
        user: {
          id: undefined,
        },
      },
    },
  }

  async updateOrCreate(id: number, block: Block) {
    const time = await this.timeRepository.findOneBy({ id })
    let foundBlock = await this.blockRepository.findOneBy({
      id: block.id,
      time,
    })
    if (foundBlock) {
      foundBlock = { ...block, time }
      const updatedBlock = await this.blockRepository.save(foundBlock)
      return updatedBlock
    }
    const newBlock = await this.blockRepository.save({ ...block, time })
    return newBlock
  }

  async deleteOne(user: Partial<User>, id: any) {
    let deletedBlock: DeleteResult

    const findOptions = this.findOptions

    findOptions.where.id = id

    if (user.role !== Role.Admin) {
      findOptions.where.time.user.id = user.id
    }

    // Check if block by exists in database
    const block = await this.blockRepository.find(findOptions)

    if (block) {
      deletedBlock = await this.blockRepository.delete({ id })
    }

    return deletedBlock
  }
}
