// 📁 backend/src/chat/chat.module.ts

import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway],
})
export class ChatModule {}