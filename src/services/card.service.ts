import { CardReqDto, CardResDto } from '@/domain/dtos/card.dto';
import { ICardService } from '@/domain/interfaces/service/card.contract';
import { TYPES } from '@common/constants';
import { inject, injectable } from 'inversify';
import { CardMapper } from './mapper';
import { ICardRepository } from '@/domain/interfaces/repository';
import { TokenDto } from '@/domain/dtos';
import * as crypto from 'crypto';

@injectable()
export class CardService implements ICardService {

  constructor(@inject(TYPES.CardRepository) private cardRepository: ICardRepository) {}

  async register(card: CardReqDto, commerceIdentifier: string): Promise<TokenDto> {
    let token = this.generateUniqueTokenHash(card);
    await this.cardRepository.register(card, token, commerceIdentifier);
    return {
      token: token
    };
  }

  async getCardDetail(token: string, commerceIdentifier: string): Promise<CardResDto> {
    const data = await this.cardRepository.getCardDetail(token, commerceIdentifier);
    return CardMapper.map(data);
  }

  private generateUniqueTokenHash(input: CardReqDto): string {
    const hash = crypto.createHash('sha256').update(JSON.stringify(input)).digest('hex').slice(0, 16);
    let token = '';
    let toggleUppercase = true;
    for (let i = 0; i < 16; i++) {
      const character = hash[i];
      if (toggleUppercase) {
        token += character.toUpperCase();
      } else {
        token += character.toLowerCase();
      }
      toggleUppercase = !toggleUppercase;
    }
    return token;
  }

}
