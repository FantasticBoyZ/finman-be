import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Register fastify-cors plugin
  app.register(fastifyCors, {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests, etc.)
      if (!origin) return callback(null, true);
      if (origin === 'http://localhost:3000') {
        // Allow this origin
        return callback(null, true);
      } else {
        // Block everything else
        return callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

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
