import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateActivityDto } from '../dto/activity';
import { Activity, ActivityDocument } from '../schema/activity.schema';

@Injectable()
export class ActivityService {
  constructor(@InjectModel(Activity.name) private activityModel: Model<ActivityDocument>) {}

  async createActivity(createActivityDto: CreateActivityDto): Promise<Activity> {
    const createdActivity = new this.activityModel(createActivityDto);
    return createdActivity.save();
  }

  async getAllActivities(userId: string, date: string): Promise<Activity[]> {
    const query: any = {};

    if (userId) {
      query.createdBy = userId;
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);
      query.createdOn = { $gte: startOfDay, $lte: endOfDay };
    }

    return this.activityModel.find(query).exec();
  }
}
