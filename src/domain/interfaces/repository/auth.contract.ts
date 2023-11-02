import { LoginReqDto } from '@/domain/dtos';
import { UserEntity } from '@/domain/entities';

export interface IAuthRepository {
  login(request: LoginReqDto): Promise<UserEntity | null>;
}
