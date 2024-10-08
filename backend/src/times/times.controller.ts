/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { Block } from 'src/blocks/block.entity'
import { Role } from 'src/guards/roles/role.enum'
import { Roles } from 'src/guards/roles/roles.decorator'
import { DeleteResult, UpdateResult } from 'typeorm'
import { Time } from './time.entity'
import { TimesService } from './times.service'

@Controller('times')
export class TimesController {
  constructor(private timesService: TimesService) {}

  @Post()
  @Roles(Role.Manager, Role.User)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async create(): Promise<Time> {
    const result = this.timesService.create()
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
  async update(
    @Param() params: any,
    @Body() body: any,
  ): Promise<Time | Block[]> {
    return this.timesService.update(params, body)
  }

  @Delete(':id')
  async delete(@Param() params: any): Promise<UpdateResult[]> {
    return this.timesService.deleteOne(params)
  }

  @Delete(':tid/block/:id')
  async deleteBlock(@Param() params: any): Promise<DeleteResult> {
    return this.timesService.deleteOneBlock(params)
  }
}
