import { TokenDto } from '@/domain/dtos';
import { CardReqDto, CardResDto } from '@/domain/dtos/card.dto';

export interface ICardService {
  
  register(card: CardReqDto, commerceIdentifier: string): Promise<TokenDto>;
  
  getCardDetail(token: string, commerceIdentifier: string): Promise<CardResDto>;

}
