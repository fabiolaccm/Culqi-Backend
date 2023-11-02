import { CardController } from '@/controllers';
import { ICardService } from '@/domain/interfaces/service';
import { CardReqDto, CardResDto, TokenDto } from '@/domain/dtos';
import { Response } from 'koa';
import { StatusCodes } from 'http-status-codes';

class MockCardService implements ICardService {

  async register(card: CardReqDto, commerceIdentifier: string): Promise<TokenDto> {
    if (commerceIdentifier === 'pk_test_3973F0B2DE6B47CF' && card != null) {
      return {
        token: "C35bC4A99aF7D7A1"
      }
    }
    throw new Error('Method not implemented.');
  }

  async getCardDetail(token: string, commerceIdentifier: string): Promise<CardResDto> {
    if (token === 'C35bC4A99aF7D7A1' && commerceIdentifier === 'pk_test_A19A5C2C980345AE') {
      return {
        "card_number": "4917480000000057",
        "expiration_month": "12",
        "expiration_year": "2025"
      }
    }
    throw new Error('Method not implemented.');
  }

}

describe('CardController', () => {
  let cardController: CardController;
  let cardService: MockCardService;

  beforeEach(() => {
    cardService = new MockCardService();
    cardController = new CardController(cardService);
  });

  it('registrar y devolver token con respuesta 200', async () => {
    
    const request: CardReqDto = {
      "email" : "fgoni@hotmail.com",
      "card_number": "4917480000000057",
      "cvv": "333",
      "expiration_year" : "2025",
      "expiration_month": "12"
    }

    const commerceIdentifier = 'pk_test_3973F0B2DE6B47CF';

    const response: Partial<Response> = {
        status: 200
    };

    await cardController.register(commerceIdentifier, request, response as Response);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({
      "token": "C35bC4A99aF7D7A1"
    });
  });


  it('Obtiene información de la tarjeta con respuesta 200', async () => {
    
    const token = 'C35bC4A99aF7D7A1';
    const commerceIdentifier = 'pk_test_A19A5C2C980345AE';

    const response: Partial<Response> = {
        status: 200
    };

    await cardController.cardInfo(token, commerceIdentifier, response as Response);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({
      "card_number": "4917480000000057",
      "expiration_month": "12",
      "expiration_year": "2025"
    });
  });



});
