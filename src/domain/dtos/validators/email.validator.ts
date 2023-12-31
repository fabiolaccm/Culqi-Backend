import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'EmailValidator', async: false })
export class EmailValidator implements ValidatorConstraintInterface {
  private message: string;
  validate(text: string) {
    console.log(text);
    if (!text) {
      this.message = 'email es requerido.';
      return false;
    } else if (!this.validEmail(text)) {
      this.message = 'el email no es válido.';
      return false;
    } else if (!this.validDomains(text)) {
      this.message = 'el dominio del email no es válido.';
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.message;
  }

  validEmail(text: string) {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(text);
  }
  validDomains(text: string) {
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    const domain = text.substring(text.indexOf('@') + 1, text.length);
    return domains.includes(domain);
  }
}
