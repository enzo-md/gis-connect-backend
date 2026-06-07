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
exports.ExternalAccessRule = void 0;
const typeorm_1 = require("typeorm");
let ExternalAccessRule = class ExternalAccessRule {
};
exports.ExternalAccessRule = ExternalAccessRule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExternalAccessRule.prototype, "RuleID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ExternalUserID' }),
    __metadata("design:type", String)
], ExternalAccessRule.prototype, "ExternalUserID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ConversationID' }),
    __metadata("design:type", String)
], ExternalAccessRule.prototype, "ConversationID", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ExternalAccessRule.prototype, "CanSendMessages", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ExternalAccessRule.prototype, "CanUploadFiles", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ExternalAccessRule.prototype, "CanViewHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ExternalAccessRule.prototype, "ExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CreatedBy' }),
    __metadata("design:type", String)
], ExternalAccessRule.prototype, "CreatedBy", void 0);
exports.ExternalAccessRule = ExternalAccessRule = __decorate([
    (0, typeorm_1.Entity)('ExternalAccessRules')
], ExternalAccessRule);
//# sourceMappingURL=external-access-rule.entity.js.map