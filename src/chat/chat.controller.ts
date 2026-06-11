import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Message } from '../schemas/message.schema.js';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  @Post('send')
  async sendMessage(@Body() message: any, @Req() req: any) {
    const newMessage = new this.messageModel({
      ...message,
      senderId: req.user.id,
    });
    await newMessage.save();
    return { success: true, message: newMessage };
  }

  @Get('messages')
  async getMessages() {
    return this.messageModel.find().sort({ createdAt: -1 }).limit(50).exec();
  }
}