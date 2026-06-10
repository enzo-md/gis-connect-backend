export declare class PusherService {
    private pusher;
    constructor();
    sendMessage(channel: string, event: string, data: any): Promise<any>;
}
