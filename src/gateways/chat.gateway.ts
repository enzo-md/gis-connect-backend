// 📁 backend/src/gateways/chat.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PusherService } from '../services/pusher.service';

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
  namespace: '/chat',
  transports: ['websocket', 'polling'],
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, string> = new Map();

  constructor(private readonly pusherService: PusherService) {}

  handleConnection(client: Socket) {
    console.log(`✅ Client connecté: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Client déconnecté: ${client.id}`);
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('register')
  handleRegister(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    this.connectedUsers.set(data.userId, client.id);
    console.log(`👤 Utilisateur ${data.userId} enregistré`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: { conversationId: string }, @ConnectedSocket() client: Socket) {
    client.join(`room:${data.conversationId}`);
    console.log(`📢 Client a rejoint la room ${data.conversationId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() data: { conversationId: string }, @ConnectedSocket() client: Socket) {
    client.leave(`room:${data.conversationId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
    console.log(`💬 Message: ${message.content}`);
    
    // Envoyer via Pusher
    await this.pusherService.sendMessage(`chat-${message.conversationId}`, 'new-message', message);
    
    // Envoyer via Socket.IO
    this.server.to(`room:${message.conversationId}`).emit('newMessage', message);
    
    return message;
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    client.to(`room:${data.conversationId}`).emit('userTyping', {
      userId: data.userId,
      isTyping: data.isTyping,
    });
  }
}