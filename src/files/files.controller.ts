// 📁 backend/src/files/files.controller.ts

import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Interface personnalisée pour le fichier uploadé
interface UploadedFileData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  private readonly uploadDir = join(process.cwd(), 'uploads');

  constructor() {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
      console.log('📁 Dossier uploads créé');
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: UploadedFileData, @Req() req: any) {
    console.log('📄 Réception fichier:', file?.originalname);
    
    if (!file) {
      return { error: 'Aucun fichier reçu' };
    }

    const fileId = uuidv4();
    const extension = file.originalname.split('.').pop();
    const filename = `${fileId}.${extension}`;
    const filePath = join(this.uploadDir, filename);
    
    // Sauvegarde du fichier
    writeFileSync(filePath, file.buffer);
    console.log('✅ Fichier sauvegardé:', filePath);
    
    return {
      id: fileId,
      filename: file.originalname,
      size: file.size,
      url: `/api/v1/files/${fileId}`,
    };
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    console.log('📥 Téléchargement fichier:', id);
    
    // Chercher le fichier dans le dossier uploads
    const fs = await import('fs/promises');
    let files: string[] = [];
    try {
      files = await fs.readdir(this.uploadDir);
    } catch {
      return res.status(404).json({ message: 'Dossier non trouvé' });
    }
    
    const file = files.find(f => f.startsWith(id));
    
    if (!file) {
      console.log('❌ Fichier non trouvé:', id);
      return res.status(404).json({ message: 'Fichier non trouvé' });
    }
    
    const filePath = join(this.uploadDir, file);
    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);
  }
}