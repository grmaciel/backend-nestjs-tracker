import { Controller, Post, Put, Get, UseInterceptors, HttpCode, Body } from "@nestjs/common";
import { LocationService } from "./location.service";
import { Observable } from "rxjs";
import { TransformInterceptor } from "../common/interceptors/transform.interceptor";
import { LocationTrackDto } from "./dto/location-track.dto";

@Controller('location')
@UseInterceptors(TransformInterceptor)
export class LocationController {
    constructor(private readonly locationService: LocationService) { }
    @Get()
    locations(): Observable<string> {
        return this.locationService.locations()
    }

    @Put()
    @HttpCode(201)
    trackLocation(@Body() locationDto: LocationTrackDto) {
        return this.locationService.trackLocation(locationDto)
    }
}