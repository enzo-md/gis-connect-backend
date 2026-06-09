// 📁 backend/src/chat/chat.controller.ts

import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  private messages: any[] = [];

  @Post('send')
  async sendMessage(@Body() message: any) {
    this.messages.push({
      ...message,
      timestamp: new Date().toISOString(),
    });
    return { success: true, message };
  }

  @Get('messages')
  async getMessages() {
    return this.messages;
  }
}