/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Time } from './time.entity'
import { TimesService } from './times.service'
import { CreateTimeDto } from './dto/time.dto'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { UpdateResult } from 'typeorm'

@Controller('times')
export class TimesController {
  constructor(private timesService: TimesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async create(@Body() createTimeDto: CreateTimeDto): Promise<Time> {
    const result = this.timesService.create(createTimeDto)
    return result
  }

  @Get()
  async findAll(): Promise<Time[]> {
    return this.timesService.findAll()
  }

  @Get(':id')
  async findOne(@Param() params: any): Promise<Time> {
    return this.timesService.findOne(params)
  }

  @Put(':id')
  async update(@Param() params: any, @Body() body: any): Promise<Time> {
    return this.timesService.update(params, body)
  }

  @Delete(':id')
  async delete(@Param() params: any): Promise<UpdateResult[]> {
    return this.timesService.deleteOne(params)
  }
}
