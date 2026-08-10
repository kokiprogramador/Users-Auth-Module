import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor.js';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const {httpAdapter} = app.get(HttpAdapterHost);
  //Using a global exception filter for custom http responses.
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  //Using global interceptors for custom OK responses.
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Api De Cocky')
    .setDescription('Una Api de Users Auth')
    .setVersion('0.1')
    .addTag('users')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('ApiDoc', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
