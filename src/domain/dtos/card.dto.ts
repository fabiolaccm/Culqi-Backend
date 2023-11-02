import { IsNotEmpty, Length, Validate } from 'class-validator';
import { EmailValidator, CardNumberValidator, CardExpirationMonthValidator, CardExpirationYearValidator } from './validators';
export class CardReqDto {
  @IsNotEmpty({ message: 'card number es requerido.' })
  @Validate(CardNumberValidator)
  card_number: string;
  @Length(3, 4, { message: 'la cantidad de digítos es invalido.' })
  @IsNotEmpty({ message: 'ccv es requerido.' })
  cvv: string;
  @Validate(CardExpirationYearValidator)
  expiration_year: string;
  @Validate(CardExpirationMonthValidator)
  expiration_month: string;
  @Validate(EmailValidator)
  email: string;
}

export class CardResDto {
  card_number: string;
  expiration_year: string;
  expiration_month: string;
}
