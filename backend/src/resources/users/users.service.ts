/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(slug: any): Promise<User> {
    return await this.usersRepository.save(slug)
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } })
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { username } })
  }
}
