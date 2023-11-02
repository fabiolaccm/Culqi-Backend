import { injectable } from 'inversify';
import { Ctx, Middleware } from 'routing-controllers';
import { Context } from 'vm';
import { HEADERS } from '../common/constants';
import { AppConfig } from '../common/config';
import { StatusCodes } from 'http-status-codes';

@Middleware({ type: 'before' })
@injectable()
export class ValidateHeadersMiddleware {

  private format_valid = /^pk_test_[0-9A-Za-z]{16}$/;

  public async use(@Ctx() context: Context, next: (err?: any) => Promise<any>): Promise<any> {

    if (this.whitelistPath().includes(context.URL.pathname) || context.method === 'OPTIONS' ) {
      return next();
    }

    const requiredHeader = context.request.header[HEADERS.COMMERCE_IDENTIFIER];
    let message = null;
    if (!requiredHeader) {
      message = `header ${HEADERS.COMMERCE_IDENTIFIER} missing`
    }
    else if (!this.format_valid.test(requiredHeader)) {
      message = `header ${HEADERS.COMMERCE_IDENTIFIER} invalid format`
    }

    if (message) {
      context.status = StatusCodes.BAD_REQUEST;
      context.body = [
        {
          param: HEADERS.COMMERCE_IDENTIFIER,
          value: message
        }
      ];
      return;
    }
    return next();
  }

  private whitelistPath() : string[] {
    const loginPath = `${AppConfig.base_path}/v1/login`;
    return [
      loginPath
    ]
  }

}
