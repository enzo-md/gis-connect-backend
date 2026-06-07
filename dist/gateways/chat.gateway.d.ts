import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: Date;
}
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedUsers;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleRegister(data: {
        userId: string;
    }, client: Socket): void;
    handleJoinRoom(data: {
        conversationId: string;
    }, client: Socket): void;
    handleLeaveRoom(data: {
        conversationId: string;
    }, client: Socket): void;
    handleSendMessage(message: Message, client: Socket): void;
    handleTyping(data: {
        conversationId: string;
        userId: string;
        isTyping: boolean;
    }, client: Socket): void;
}
export {};
