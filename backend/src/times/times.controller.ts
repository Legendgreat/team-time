/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Time } from './entities/time.entity'
import { TimesService } from './times.service'
import { CreateTimeDto } from './dto/time.dto'
import { ApiCreatedResponse } from '@nestjs/swagger'

@Controller('times')
export class TimesController {
  constructor(private timesService: TimesService) {}

  @Get()
  async findAll(): Promise<Time[]> {
    return this.timesService.findAll()
  }

  @Get(':id')
  async findOne(@Param() params: any): Promise<Time> {
    return this.timesService.findOne(params)
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async create(@Body() createTimeDto: CreateTimeDto): Promise<Time> {
    const result = this.timesService.create(createTimeDto)
    return result
  }
}
