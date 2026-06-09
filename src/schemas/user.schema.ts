// 📁 backend/src/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, enum: ['internal', 'external'] })
  userType: string;

  @Prop({ required: false })
  company: string;

  @Prop({ required: false })
  externalCompanyName: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  lastSeen: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);