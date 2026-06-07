import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';
interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}
export declare class FilesService {
    private fileRepository;
    private readonly uploadDir;
    private readonly previewDir;
    constructor(fileRepository: Repository<File>);
    saveFile(file: MulterFile, userId: string): Promise<File>;
    findById(id: string): Promise<File>;
    getFilePath(id: string): Promise<string>;
    deleteFile(id: string): Promise<void>;
}
export {};
