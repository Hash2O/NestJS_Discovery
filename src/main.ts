import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { doubleCsrf } from 'csrf-csrf';
// import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
//import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Validation Pipe pour utiliser les DTO mises en place
  //app.useGlobalGuards(new AuthGuard()); // Pour utiliser AuthGuard sur toute l'application, décommenter ici et l'import au dessus
  //app.setGlobalPrefix('api/v1'); // Pour ajouter des prefixes aux différentes URL, décommenter ici
  // app.enableCors({
  //   origin: ['http://localhost:3000', 'http://localhost:8080'], // URL Whitelist
  //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Méthodes autorisées sur l'app
  //   allowedHeaders: ['Content-Type', 'Authorization'], // Headers entrants
  //   exposedHeaders: ['Content-Range', 'X-Total-Count'], // Headers sortants
  //   maxAge: 600, // Durée max du temps de cache des ressources type cookies
  //   optionsSuccessStatus: 204, // Configure le statut du succès des requêtes
  //   preflightContinue: false, // Poursuivre la requête après la réponse (?)
  //   credentials: true, // Montrer patte blanche : nécessité de token pour les requêtes
  // }); // Cross Origin Resource Sharing
  // const { doubleCsrfProtection } = doubleCsrf({
  //   cookieOptions: {
  //     secure: process.env.NODE_ENV == 'production', // inaccessibilité au JS côté client
  //     sameSite: 'strict', // sécurise les cookies
  //     httpOnly: true, // idem inaccessibilité au JS coté client
  //     maxAge: 60 * 60 * 24 * 30, // Durée un mois
  //   },
  //   getSecret: () => process.env.CSRF_SECRET as string, // récupère la clé mise en place dans le .env
  //   getSessionIdentifier: (req: any) => req.sessionID, // comparaison
  // });
  // app.use(doubleCsrfProtection);
  // app.set('trustproxy', 'loopback'); // Valeur 1 : Proxy, Valeur 2 : adresse IP pour récup l'adresse IP réelle du client
  // app.use(
  //   helmet({
  //     crossOriginOpenerPolicy: false, // Isolation entre fenêtres et onglets de différentes origines
  //     contentSecurityPolicy: false, // Gère le type de ressources pouvant être chargées par le navigateur. Protection contre attaque de type XSS
  //     crossOriginEmbedderPolicy: false, // Travaille de paire avec crossOriginOpenerPolicy
  //     crossOriginResourcePolicy: false, //
  //     originAgentCluster: false,
  //     permittedCrossDomainPolicies: false,
  //     referrerPolicy: false,
  //     strictTransportSecurity: false, // force l'utilisation du mode HTTPS
  //     xContentTypeOptions: false,
  //     xDownloadOptions: false,
  //     xFrameOptions: false, // Protection contre attaque de type click jacking
  //   }),
  // );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
