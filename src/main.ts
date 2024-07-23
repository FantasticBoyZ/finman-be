import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Register fastify-cors plugin
  
const CORS_OPTIONS = {
  origin: ['*'], // or '*' or whatever is required
  allowedHeaders: [
  'Access-Control-Allow-Origin',
  'Origin',
  'X-Requested-With',
  'Accept',
  'Content-Type',
  'Authorization',
],
exposedHeaders: 'Authorization',
credentials: true,
methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
};

app.enableCors(CORS_OPTIONS)

  // Global error handling for unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    if (reason instanceof AggregateError) {
      reason.errors.forEach((error, index) => {
        console.error(`Error ${index + 1}:`, error);
      });
    }
  });

  await app.listen(8080, '0.0.0.0');
}
bootstrap();
