// 📁 backend/src/schemas/message.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  conversationId: string;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  senderName: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isFile: boolean;

  @Prop()
  fileId: string;

  @Prop()
  fileName: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);