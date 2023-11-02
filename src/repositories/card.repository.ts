import { ICardRepository } from '@/domain/interfaces/repository/card.contract';
import { TYPES } from '@common/constants';
import { RedisConnection } from '@common/utils';
import { RedisConfig } from '@common/config/environment';
import { CardEntity } from '@/domain/entities';
import { injectable, inject } from 'inversify';
import { CardReqDto } from '@/domain/dtos/card.dto';
import { Encryption } from '../common/utils/encryption-culqi';

@injectable()
export class CardRepository implements ICardRepository {

  constructor(
    @inject(TYPES.RedisConnection) private redis: RedisConnection,
    @inject(TYPES.Encryption) private encryption: Encryption
    ) {}

  async register(card: CardReqDto, token: string, commerceIdentifier: string): Promise<void> {
    
    let entity = new CardEntity();
    Object.assign(entity, card);
    entity.uniqueId = token;
    
    let redisKey = this.buildRedisKey(commerceIdentifier, token);
    const client = await this.redis.getClient();
    const dataEncrypted = this.encryption.encryptData(entity);
    await client.set(redisKey, dataEncrypted);
    await client.expire(redisKey, RedisConfig.ttl);
  }

  async getCardDetail(token: string, commerceIdentifier: string): Promise<CardEntity> {
    const client = await this.redis.getClient();
    let redisKey = this.buildRedisKey(commerceIdentifier, token);
    const data = await client.get(redisKey);
    if (data) {
      return JSON.parse(this.encryption.decryptData(data));
    }
    throw new Error("No existe información para el registro enviado.");
  }

  private buildRedisKey(commerceIdentifier: string, token: string) {
    return `CardsMap:${commerceIdentifier}-${this.encryption.hashSHA256(token)}`
  }


}
