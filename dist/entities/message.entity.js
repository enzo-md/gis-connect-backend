"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.MessageType = void 0;
const typeorm_1 = require("typeorm");
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "text";
    MessageType["FILE"] = "file";
    MessageType["PDF"] = "pdf";
    MessageType["REACTION"] = "reaction";
    MessageType["SYSTEM"] = "system";
})(MessageType || (exports.MessageType = MessageType = {}));
let Message = class Message {
};
exports.Message = Message;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Message.prototype, "MessageID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ConversationID' }),
    __metadata("design:type", String)
], Message.prototype, "ConversationID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SenderID' }),
    __metadata("design:type", String)
], Message.prototype, "SenderID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Message.prototype, "MessageType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'nvarchar', length: 'MAX' }),
    __metadata("design:type", String)
], Message.prototype, "Content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'FileID', nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "FileID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "PDFPageCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ReplyToID', nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "ReplyToID", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "IsEdited", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "IsDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "IsPinned", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "SentAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "EditedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], Message.prototype, "DeletedAt", void 0);
exports.Message = Message = __decorate([
    (0, typeorm_1.Entity)('Messages')
], Message);
//# sourceMappingURL=message.entity.js.map