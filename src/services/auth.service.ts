import { IAuthService } from '@/domain/interfaces/service/auth.contract';
import { TYPES } from '@common/constants';
import { inject, injectable } from 'inversify';
import { IAuthRepository } from '@/domain/interfaces/repository';
import { LoginReqDto, LoginResDto } from '@/domain/dtos';

@injectable()
export class AuthService implements IAuthService {
  
  constructor(@inject(TYPES.AuthRepository) private authRepository: IAuthRepository) {
  }
  
  async login(request: LoginReqDto): Promise<LoginResDto | null> {
    const response = await this.authRepository.login(request);
    if (response) {
      return {
        pk: response.pk,
        name: response.name
      }
    }
    return null; 
  }

}
