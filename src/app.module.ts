import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from 'users/users.controller';
import { AuthModule } from 'authentication/auth.module';
import { LocationController } from 'location/location.controller';
import { LocationService } from '../src/location/location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'database/database.module';
import { TrackingModule } from '../src/tracking/tracking.module';
import { LocationSessionService } from '../src/location-session/location-session.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/location-tracker'),
    TrackingModule
  ],
  controllers: [

  ]
})
export class AppModule { }
