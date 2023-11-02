import Koa from 'koa';
import { BaseController } from '@/controllers/base-controller';
import { Body, Controller, Post, Res } from 'routing-controllers';
import { LoginReqDto } from '@/domain/dtos';
import { IAuthService } from '@/domain/interfaces/service';
import { TYPES } from '@common/constants';
import { inject } from 'inversify';

@Controller('/v1/login')
export class AuthController extends BaseController {

  constructor(@inject(TYPES.AuthService) private authService: IAuthService) {
    super();
  }

  @Post()
  public async login(@Body() data: LoginReqDto, @Res() res: Koa.Response) {
    let response = await this.authService.login(data);
    if (response) {
      return this.ok(res, response);
    }
    return this.notFound(res, "User not exist");
  }
}
