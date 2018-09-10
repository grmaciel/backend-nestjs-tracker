import { Injectable } from "@nestjs/common";
import { Observable, of, defer, fromEvent } from "rxjs";
import { LocationTrackDto } from "./dto/location-track.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { async } from "rxjs/internal/scheduler/async";
import { Location } from "./location.interface";

@Injectable()
export class LocationService {
    constructor(@InjectModel('Location') private readonly locationModel: Model<Location>) { }

    locations(): Observable<Location[]> {
        // return defer(() => this.locationsPromise())
        return of([])
    }

    private async locationsPromise() {//: Promise<Location[]> {
        // return await this.locationModel.find().exec();
    }

    private startTrackingSession() {
        console.log('we are tracking session')
    }

    trackLocation(locationDto: LocationTrackDto): Observable<any> {
        // this.startTrackingSession();
        // const location = new this.locationModel(locationDto);
        // return defer(async function () {
        //     return await location.save();
        // })

        return of({})
        // return of('all user locations')

        // return 'user location lat: ' + location.latitude + ' long: ' + location.longitude
    }
}