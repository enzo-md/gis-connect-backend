import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/chat',
})
export class ChatGateway {
  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('newMessage', message);
    return message;
  }
}