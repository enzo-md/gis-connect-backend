"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const databaseConfig = (configService) => ({
    type: 'mssql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
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
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map