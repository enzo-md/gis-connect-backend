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

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, string> = new Map(); // socketId -> userId

  handleConnection(client: Socket) {
    console.log(`Client connecté: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client déconnecté: ${client.id}`);
    // Supprimer l'utilisateur de la map
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('register')
  handleRegister(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.connectedUsers.set(data.userId, client.id);
    console.log(`Utilisateur ${data.userId} enregistré avec socket ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`room:${data.conversationId}`);
    console.log(`Client ${client.id} a rejoint la room ${data.conversationId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`room:${data.conversationId}`);
    console.log(`Client ${client.id} a quitté la room ${data.conversationId}`);
  }

  @SubscribeMessage('createTestRoom')
handleCreateTestRoom(@ConnectedSocket() client: Socket) {
  client.join('room:1');
  client.emit('roomCreated', { roomId: '1', name: 'Salon Général' });
  console.log('Salon de test créé');
}

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() message: Message,
    @ConnectedSocket() client: Socket,
  ) {
    // Diffuser le message à tous les clients dans la room
    this.server.to(`room:${message.conversationId}`).emit('newMessage', message);
    console.log(`Message envoyé: ${message.content}`);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { conversationId: string; userId: string; isTyping: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(`room:${data.conversationId}`).emit('userTyping', {
      userId: data.userId,
      isTyping: data.isTyping,
    });
  }
}