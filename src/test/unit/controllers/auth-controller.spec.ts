import { AuthController } from '@/controllers';
import { IAuthService } from '@/domain/interfaces/service';
import { LoginReqDto, LoginResDto } from '@/domain/dtos';
import { Response } from 'koa';
import { StatusCodes } from 'http-status-codes';

class MockAuthService implements IAuthService {
    async login(request: LoginReqDto): Promise<LoginResDto | null> {
      if (request.user === 'test@example.com' && request.password === 'password123') {
        return {
          pk: 'pk_test_DEA5B5F048F74A06',
          name: 'any-user'
        }
      }
      return null;
    }
}

describe('AuthController', () => {
  let authController: AuthController;
  let authService: MockAuthService;

  beforeEach(() => {
    authService = new MockAuthService();
    authController = new AuthController(authService);
  });

  it('debería autenticar con éxito y devolver respuesta 200', async () => {
    const loginData: LoginReqDto = {
      user: 'test@example.com',
      password: 'password123',
    };

    const response: Partial<Response> = {
        status: 200
    };

    await authController.login(loginData, response as Response);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({
      "pk": "pk_test_DEA5B5F048F74A06",
      "name": "any-user"
    });
  });

  
  it('debería devolver una respuesta 404 para una autenticación fallida', async () => {
    const loginData: LoginReqDto = {
      user: 'user-not-found@example.com',
      password: 'invalid-password',
    };
    const response: Partial<Response> = {
      status: 404
    };

    await authController.login(loginData, response as Response);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual(
      {
        "code": "CQ_1000",
        "errors": undefined,
        "message": "User not exist",
        "status": 404
      }
    );
  });
});
