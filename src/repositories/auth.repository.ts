import { UserEntity } from '@/domain/entities';
import { injectable } from 'inversify';
import { IAuthRepository } from '@/domain/interfaces/repository';
import { LoginReqDto } from '@/domain/dtos';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class AuthRepository implements IAuthRepository {
  
  private usersMap = new Map<string, UserEntity>();

  constructor() {

    let user1 = new UserEntity("user1", "123456", "Famer",  "pk_test_" + this.generateFormattedUUID());
    let user2 = new UserEntity("user2", "123456", "Dayron", "pk_test_" + this.generateFormattedUUID());
    let user3 = new UserEntity("user3", "123456", "Doris",  "pk_test_" + this.generateFormattedUUID());

    this.usersMap.set(user1.user, user1);
    this.usersMap.set(user2.user, user2);
    this.usersMap.set(user3.user, user3);
  }

  async login(request: LoginReqDto): Promise<UserEntity | null> {
    let user = this.usersMap.get(request.user);

    if (!user) {
      throw new Error("User not found"); 
    }
  
    if (user.password !== request.password) {
      throw new Error("Invalid credentials"); 
    }

    return user;
  }

  private generateFormattedUUID(): string {
    const uuid = uuidv4();
    const formattedUUID = uuid.replace(/-/g, '').toUpperCase();
    return formattedUUID.slice(0, 16);
  }

}
