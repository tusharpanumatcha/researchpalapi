import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: true })
  activityName: string;

  @Prop({ type: Date, default: Date.now })
  createdOn: Date;

  @Prop()
  activityNotes: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
