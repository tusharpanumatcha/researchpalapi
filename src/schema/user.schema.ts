// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  readonly username: string;

  @Prop({ unique: true })
  readonly email: string;

  @Prop()
  readonly password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
