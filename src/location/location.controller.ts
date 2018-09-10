import { Controller, Post, Put, Get, UseInterceptors, HttpCode, Body } from "@nestjs/common";
import { LocationService } from "./location.service";
import { Observable } from "rxjs";
import { TransformInterceptor } from "../common/interceptors/transform.interceptor";
import { LocationTrackDto } from "./dto/location-track.dto";
import { Location } from "./location.interface";

@Controller('location')
@UseInterceptors(TransformInterceptor)
export class LocationController {
    constructor(private readonly locationService: LocationService) { }
    @Get()
    locations(): Observable<Location[]> {
        console.log('GET CALLEED')
        return this.locationService.locations()
    }

    @Put()
    @HttpCode(201)
    trackLocation(@Body() locationDto: LocationTrackDto) {
        console.log('PUT CALLEED')
        return this.locationService.trackLocation(locationDto)
    }
}