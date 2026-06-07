"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const chat_gateway_1 = require("./gateways/chat.gateway");
const files_module_1 = require("./files/files.module");
const user_entity_1 = require("./entities/user.entity");
const team_entity_1 = require("./entities/team.entity");
const team_member_entity_1 = require("./entities/team-member.entity");
const conversation_entity_1 = require("./entities/conversation.entity");
const conversation_participant_entity_1 = require("./entities/conversation-participant.entity");
const message_entity_1 = require("./entities/message.entity");
const file_entity_1 = require("./entities/file.entity");
const external_access_rule_entity_1 = require("./entities/external-access-rule.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [files_module_1.FilesModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const host = configService.get('DB_HOST');
                    const portRaw = configService.get('DB_PORT', '1433');
                    const port = parseInt(portRaw, 10);
                    const username = configService.get('DB_USER');
                    const password = configService.get('DB_PASSWORD');
                    const database = configService.get('DB_DATABASE');
                    console.log('🔧 Configuration DB:', { host, port, username, database });
                    return {
                        type: 'mssql',
                        host: host,
                        port: port,
                        username: username,
                        password: password,
                        database: database,
                        options: {
                            trustServerCertificate: true,
                            encrypt: false,
                        },
                        entities: [user_entity_1.User, team_entity_1.Team, team_member_entity_1.TeamMember, conversation_entity_1.Conversation, conversation_participant_entity_1.ConversationParticipant, message_entity_1.Message, file_entity_1.File, external_access_rule_entity_1.ExternalAccessRule],
                        synchronize: true,
                        logging: true,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,],
        controllers: [],
        providers: [chat_gateway_1.ChatGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map