import { Injectable } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { LocationTrackDto } from "./dto/location-track.dto";

@Injectable()
export class LocationService {
    locations(): Observable<string> {
        return of('all user locations')
    }

    private startTrackingSession() {
        console.log('we are tracking session')
    }

    trackLocation(location: LocationTrackDto) {
        this.startTrackingSession();
        return 'user location lat: ' + location.latitude + ' long: ' + location.longitude
    }
}