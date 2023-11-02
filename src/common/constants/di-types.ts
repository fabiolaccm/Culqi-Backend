const TYPES = {
  RedisConnection: Symbol.for('RedisConnection'),
  Encryption: Symbol.for('Encryption'),
  CardService: Symbol.for('CardService'),
  AuthService: Symbol.for('AuthService'),
  CardRepository: Symbol.for('CardRepository'),
  AuthRepository: Symbol.for('AuthRepository')
};

export { TYPES };
