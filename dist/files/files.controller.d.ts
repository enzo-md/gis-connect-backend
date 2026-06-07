import { Response } from 'express';
import { FilesService } from './files.service';
interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: MulterFile, req: any): Promise<{
        id: string;
        filename: string;
        size: number;
        url: string;
    }>;
    getFile(id: string, res: Response): Promise<void>;
}
export {};
