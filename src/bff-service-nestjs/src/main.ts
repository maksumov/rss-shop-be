import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { resolve } from 'path';
import { AppModule } from './app.module';

/**
 * Load Config from .env file
 */
config({ path: resolve(__dirname, '../.env') });

const PORT: number = parseInt((process.env.PORT as string) || '3000', 10);

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => logger.log(`Server started at port ${PORT}`));
}
bootstrap();
