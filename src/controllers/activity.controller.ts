import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ActivityService } from '../services/activity.service';
import { CreateActivityDto } from '../dto/activity';
import { Activity } from '../schema/activity.schema';

import { Api } from '../util/api';

@Controller('api/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async createActivity(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activityService.createActivity(createActivityDto);
  }

  @Get()
  async getAllActivities(
    @Query('userId') userId: string,
    @Query('date') date: string,
  ): Promise<Activity[]> {
    return this.activityService.getAllActivities(userId, date);
  }
}
