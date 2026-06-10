import { User } from './user.entity';
export declare class File {
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    createdAt: Date;
    uploadedBy: string;
    uploader: User;
}
