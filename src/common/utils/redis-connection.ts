import { RedisConfig } from '@common/config/environment';
import { injectable } from 'inversify';
import { Client } from 'redis-om';

@injectable()
export class RedisConnection {

  private client!: Client;

  async getClient() {
    if (this.client == null) {
      this.client = await this.connect();
    } else {
      if (!this.client.isOpen()) {
        this.client = await this.connect();
      }
    }
    return this.client;
  }

  private connect(): Promise<Client> {
    return new Client().open(RedisConfig.redis_url);
  }

}