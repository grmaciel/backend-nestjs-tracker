import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from 'users/users.controller';
import { AuthModule } from 'authentication/auth.module';
import { LocationController } from 'location/location.controller';
import { LocationService } from 'location/location.service';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [
    AppController,
    UserController,
    LocationController
  ],
  providers: [
    AppService,
    LocationService
  ],
})
export class AppModule { }
