import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { UserappModule } from './userapp/userapp.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    UserappModule,
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 3 }, // Throttler : Rate Limiting. ici, 3 requetes par sec
      { name: 'medium', ttl: 10000, limit: 10 },
      { name: 'long', ttl: 100000, limit: 100 },
    ]),
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    UsersService,
    { provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard }, // Permet de configurer ThrottleGuard globalement
  ],
})
export class AppModule {}
