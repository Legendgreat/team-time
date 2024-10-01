/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Time } from './entities/time.entity'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

@Injectable()
export class TimesService {
  constructor(
    @InjectRepository(Time)
    private timesRepository: Repository<Time>,
  ) {}

  private readonly times: Time[] = []

  create(time: Time): Promise<Time> {
    const newTime = new Time()
    newTime
    return this.timesRepository.save(newTime)
  }

  findAll(): Promise<Time[]> {
    return this.timesRepository.find({
      relations: ['blocks'],
    })
  }

  findOne(id: UUID): Promise<Time | null> {
    return this.timesRepository.findOneBy({ id })
  }
}
