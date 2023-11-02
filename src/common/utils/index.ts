import { AppConfig } from '@common/config';
import { WinstonLogger } from './winston-logger';

const logger = new WinstonLogger(false, AppConfig.is_development, AppConfig.log_dir);

export { logger };
export { RedisConnection } from './redis-connection';
export { Encryption } from './encryption-culqi';