import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  const config = new DocumentBuilder()
    .setTitle("CRM-PANEL API")
    .setDescription("by Nodirbek")
    .build();

    const document = SwaggerModule.createDocument(app, config);
    const theme = new SwaggerTheme();
    const options = {
      explorer: true,
        customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA)
    }
    SwaggerModule.setup('api', app, document, options);
    
    await app.listen(3000);
}
bootstrap();
