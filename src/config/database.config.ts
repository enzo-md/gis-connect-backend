// 📁 GIS-CONNECT/backend/src/config/database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mssql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false, // Important: false pour production, utiliser les migrations
    logging: configService.get('NODE_ENV') === 'development',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    extra: {
        connectionTimeout: 30000,
        requestTimeout: 30000,
    },
});