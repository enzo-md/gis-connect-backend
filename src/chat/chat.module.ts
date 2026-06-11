// 📁 backend/src/chat/chat.module.ts

import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  // providers: [ChatGateway], ← Commenté temporairement
})
export class ChatModule {}