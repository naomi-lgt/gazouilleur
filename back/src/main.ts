import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export const validationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  });

  export const applyGlobalConfiguration = (app: INestApplication) => {
    app.useGlobalPipes(validationPipe);
    app.setGlobalPrefix('api');
  };


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
.setTitle('Gazouilleur API 🐦')
    .setDescription(
    `Gazouilleur est un réseau social unique en son genre
    qui permet de faire des tweets ! Euh... Gazouillis.`,
    )
    .setVersion('1.0')
    .setExternalDoc('Lien vers GitHub', 'git@github.com:naomi-lgt/gazouilleur.git')
    .setContact('Naomi Legentil', 'http://perdu.com', 'naomi.legentil@outlook.fr')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  const port = configService.get('PORT');
  app.useGlobalPipes(validationPipe);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:4200'
  });
  await app.listen(port);
}
bootstrap();
