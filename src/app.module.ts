import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from 'users/users.controller';
import { AuthModule } from 'authentication/auth.module';
import { LocationController } from 'location/location.controller';
import { LocationService } from 'location/location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from './location/location.module';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/location-tracker'),
    LocationModule,
  ],
  controllers: [

  ],
  providers: [

  ]
})
export class AppModule { }
