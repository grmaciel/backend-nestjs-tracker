import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from '../location/location.service';
import { TrackingController } from './tracking.controller';
import { LocationSessionSchema } from '../location-session/location-session.schema';
import { LocationSchema } from '../location/location.schema';
import { LocationSessionService } from '../location-session/location-session.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }]),
        MongooseModule.forFeature([{ name: 'LocationSession', schema: LocationSessionSchema }])
    ],
    controllers: [
        TrackingController
    ],
    providers: [
        LocationService,
        LocationSessionService
    ],
})
export class TrackingModule { }