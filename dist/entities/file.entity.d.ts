import { Message } from './message.entity';
import { User } from './user.entity';
export declare class File {
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    previewPath: string;
    pageCount: number;
    createdAt: Date;
    uploadedBy: string;
    uploader: User;
    messageId: string;
    message: Message;
}
