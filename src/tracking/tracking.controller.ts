import { Controller, Post, Put, Get, UseInterceptors, HttpCode, Body, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { LocationService } from '../location/location.service';
import { Location } from '../location/location.interface';
import { LocationSessionService } from '../location-session/location-session.service';
import { LocationTrackDto } from '../location/dto/location-track.dto';



@Controller('tracking')
@UseInterceptors(TransformInterceptor)
export class TrackingController {
    constructor(
        private readonly locationService: LocationService,
        private readonly locationSessionService: LocationSessionService) { }

    @Get()
    locations(): Observable<Location[]> {
        return this.locationService.locations()
    }

    @Put(':id')
    @HttpCode(201)
    trackLocation(@Param('id') id, @Body() locationDto: LocationTrackDto) {
        return this.locationService.trackLocation(locationDto)
    }

    // In the future we will need to extract this into a different session controller
    // to be able to query session history and all that
    @Post()
    startSession() {
        return this.locationSessionService.startSession()
    }

    @Post(':id')
    endSession(@Param('id') id) {
        return this.locationSessionService.endSession(id)
    }
}