import { EmailValidator } from '@/domain/dtos/validators';
const emailValidator = new EmailValidator();

describe('Email Validación', () => {
  describe('Dominio no valido', () => {
    test('Agregar un dominio incorrecto', () => {
      expect(emailValidator.validDomains('example@yahoo.com')).toBe(false);
    });
  });
  describe('Dominios validos', () => {
    test('Agregar un dominio gmail correcto', () => {
      expect(emailValidator.validDomains('example@gmail.com')).toBe(true);
    }); 
    test('Agregar un dominio hotmail correcto', () => {
      expect(emailValidator.validDomains('example@hotmail.com')).toBe(true);
    });
    test('Agregar un dominio yahoo correcto', () => {
      expect(emailValidator.validDomains('example@yahoo.es')).toBe(true);
    });
  });
});
