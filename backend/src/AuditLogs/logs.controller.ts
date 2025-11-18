import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto, CreateLogQueryDto } from './dto/create-log.dto';
import { GetLogsQueryDto } from './dto/get-log.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(
    @Body() createLogDto: CreateLogDto,
    @Query() query: CreateLogQueryDto,
  ) {
    return this.logsService.create(createLogDto, query.userId);
  }

  @Get()
  findAll(@Query() query: GetLogsQueryDto) {
    return this.logsService.findAll(query);
  }
}
