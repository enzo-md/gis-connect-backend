export declare class ChatController {
    private messages;
    sendMessage(message: any): Promise<{
        success: boolean;
        message: any;
    }>;
    getMessages(): Promise<any[]>;
}
