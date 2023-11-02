import { ICardService } from '@/domain/interfaces/service';
import { TYPES } from '@common/constants';
import { inject } from 'inversify';
import { Body, Controller, Get, HeaderParam, Post, Res } from 'routing-controllers';
import Koa from 'koa';
import { CardReqDto } from '@/domain/dtos';
import { HEADERS } from '../common/constants';
import { BaseController } from '@/controllers/base-controller';

@Controller('/v1/tokens')
export class CardController extends BaseController {

  constructor(@inject(TYPES.CardService) private cardService: ICardService) {
    super();
  }

  @Post()
  public async register(
    @HeaderParam(HEADERS.COMMERCE_IDENTIFIER) commerceIdentifier: string, 
    @Body() data: CardReqDto, 
    @Res() res: Koa.Response) {
    const result = await this.cardService.register(data, commerceIdentifier);
    return this.ok(res, result);
  }

  @Get('/card-info')
  public async cardInfo(
    @HeaderParam(HEADERS.AUTHORIZATION) token: string, 
    @HeaderParam(HEADERS.COMMERCE_IDENTIFIER) commerceIdentifier: string,
    @Res() res: Koa.Response) {
    const result = await this.cardService.getCardDetail(token, commerceIdentifier);
    return this.ok(res, result);
  }
}
