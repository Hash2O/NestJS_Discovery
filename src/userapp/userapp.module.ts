import { Module } from '@nestjs/common';
import { UserappService } from './userapp.service';
import { UserappController } from './userapp.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserappController],
  providers: [UserappService],
})
export class UserappModule {}
