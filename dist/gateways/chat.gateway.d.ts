import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedUsers;
    constructor();
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
    handleSendMessage(message: any, client: Socket): Promise<any>;
    handleTyping(data: any, client: Socket): void;
}
