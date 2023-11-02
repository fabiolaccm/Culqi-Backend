import { CardReqDto } from '@/domain/dtos/card.dto';
import { CardEntity } from '@/domain/entities';

export interface ICardRepository {
  register(card: CardReqDto, token: string, commerceIdentifier: string): Promise<void>;
  getCardDetail(token: string, commerceIdentifier: string): Promise<CardEntity>;
}
