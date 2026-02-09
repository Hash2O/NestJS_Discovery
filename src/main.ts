import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Validation Pipe pour utiliser les DTO mises en place
  //app.useGlobalGuards(new AuthGuard()); // Pour utiliser AuthGuard sur toute l'application, décommenter ici et l'import au dessus
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
