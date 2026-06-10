// 📁 backend/src/services/pusher.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class PusherService {
  private pusher: any;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Pusher = require('pusher');
    this.pusher = new Pusher({
      appId: '2164608',
      key: '46f0eed1a1b09d2bcf49',
      secret: 'e37308f8eb028be34151',
      cluster: 'eu',
      useTLS: true,
    });
  }

  async sendMessage(channel: string, event: string, data: any) {
    return this.pusher.trigger(channel, event, data);
  }
}
