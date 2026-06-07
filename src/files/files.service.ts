// 📁 backend/src/files/files.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createWriteStream, createReadStream, mkdirSync, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { File } from '../entities/file.entity';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Injectable()
export class FilesService {
  private readonly uploadDir = join(process.cwd(), 'uploads');

  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
      console.log('📁 Dossier uploads créé par FilesService');
    }
  }

  async saveFile(file: MulterFile, userId: string): Promise<File> {
    console.log('💾 Sauvegarde du fichier:', file.originalname);
    
    const fileId = uuidv4();
    const extension = file.originalname.split('.').pop();
    const filename = `${fileId}.${extension}`;
    const filePath = join(this.uploadDir, filename);

    // Sauvegarde physique
    const writeStream = createWriteStream(filePath);
    writeStream.write(file.buffer);
    writeStream.end();
    
    console.log('✅ Fichier physique sauvegardé:', filePath);

    // Sauvegarde en BDD
    const fileEntity = this.fileRepository.create({
      id: fileId,
      filename: filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: filePath,
      uploadedBy: userId,
    });

    return this.fileRepository.save(fileEntity);
  }

  async getFileStream(id: string): Promise<{ stream: any; fileName: string; mimeType: string }> {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) {
      throw new NotFoundException('Fichier non trouvé');
    }
    
    const stream = createReadStream(file.path);
    return {
      stream: stream,
      fileName: file.originalName,
      mimeType: file.mimeType,
    };
  }

  async deleteFile(id: string): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (file) {
      if (existsSync(file.path)) {
        unlinkSync(file.path);
      }
      await this.fileRepository.delete(id);
    }
  }
}