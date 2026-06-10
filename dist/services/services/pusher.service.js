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
exports.PusherService = void 0;
const common_1 = require("@nestjs/common");
let PusherService = class PusherService {
    constructor() {
        const Pusher = require('pusher');
        this.pusher = new Pusher({
            appId: '2164608',
            key: '46f0eed1a1b09d2bcf49',
            secret: 'e37308f8eb028be34151',
            cluster: 'eu',
            useTLS: true,
        });
    }
    async sendMessage(channel, event, data) {
        return this.pusher.trigger(channel, event, data);
    }
};
exports.PusherService = PusherService;
exports.PusherService = PusherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PusherService);
//# sourceMappingURL=pusher.service.js.map