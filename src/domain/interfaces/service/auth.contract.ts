import { LoginReqDto, LoginResDto } from '@/domain/dtos';

export interface IAuthService {
  login(request: LoginReqDto): Promise<LoginResDto | null>;
}
