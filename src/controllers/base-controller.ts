import { ResponseCodes } from '@common/constants';
import { ErrorResponse, IParamError } from '@common/model';
import Koa from 'koa';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';

@injectable()
export class BaseController {

  ok(res: Koa.Response, data?: string | object | any) {
    res.status = StatusCodes.OK;
    res.body = data;
    return res;
  }
  
  badRequest(res: Koa.Response, message?: string) {
    return this.errorReponse(res, StatusCodes.BAD_REQUEST, message);
  }

  notFound(res: Koa.Response, message?: string) {
    return this.errorReponse(res, StatusCodes.NOT_FOUND, message);
  }
  
  internalError(res: Koa.Response, message?: string) {
    return this.errorReponse(res, StatusCodes.INTERNAL_SERVER_ERROR, message);
  }

  unauthorized(res: Koa.Response, message?: string) {
    return this.errorReponse(res, StatusCodes.UNAUTHORIZED, message);
  }

  invalidParamError(res: Koa.Response, errors: IParamError[]) {
    res.status = StatusCodes.UNPROCESSABLE_ENTITY;
    res.body = new ErrorResponse({
      code: ResponseCodes.MODEL_IS_NOT_VALID,
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      errors: errors
    });
    return res;
  }

  private errorReponse(res: Koa.Response, status: StatusCodes, message?: string) {
    const errorResponse = new ErrorResponse({
      code: ResponseCodes.FAILURE,
      status: status,
      message: message || getReasonPhrase(<number>status)
    });
    res.status = status;
    res.body = errorResponse;
    return res;
  }
}
