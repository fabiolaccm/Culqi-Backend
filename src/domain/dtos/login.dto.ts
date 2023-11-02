import { IsNotEmpty } from 'class-validator';

export class LoginReqDto {

  @IsNotEmpty({ message: 'user required.' })
  user: string;

  @IsNotEmpty({ message: 'password required.' })
  password: string;  
}

export class LoginResDto {
  pk: string;
  name: string;
}
