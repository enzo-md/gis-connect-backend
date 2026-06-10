import { Response } from 'express';
interface UploadedFileData {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}
export declare class FilesController {
    private readonly uploadDir;
    constructor();
    uploadFile(file: UploadedFileData, req: any): Promise<{
        error: string;
        id?: undefined;
        filename?: undefined;
        size?: undefined;
        url?: undefined;
    } | {
        id: string;
        filename: string;
        size: number;
        url: string;
        error?: undefined;
    }>;
    getFile(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
export {};
