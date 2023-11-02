import { injectable } from 'inversify';
import * as crypto from 'crypto';
import { EncrptionConfig } from '@common/config';

@injectable()
export class Encryption {

  private secretKey = EncrptionConfig.secret_key;
  private iv = crypto.randomBytes(16);

  encryptData(data: object): string {
    const jsonStr = JSON.stringify(data);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.secretKey), this.iv);
    let encrypted = cipher.update(jsonStr, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  decryptData(encryptedData: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.secretKey), this.iv);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  hashSHA256(input: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}
  
}