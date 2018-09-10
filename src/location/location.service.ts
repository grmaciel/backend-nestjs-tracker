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
        return defer(() => this.locationsPromise())
        // return this.locationModel.find().lean().exec();
        // return this.locationsPromise();
        // return this.locationModel.find().lean()
    }

    private locationsPromise(): Promise<Location[]> {
        console.log('ASYNC LOCATION PROMISE DB DATA: ')
        return this.locationModel.find().lean().exec()
    }

    private startTrackingSession() {
        // console.log('we are tracking session')
    }

    trackLocation(locationDto: LocationTrackDto): Observable<Location> {
        // console.log('we are gonna persist this: ' + JSON.stringify(locationDto))
        this.startTrackingSession();
        const location = new this.locationModel(locationDto);
        // console.log('final mongo: ' + JSON.stringify(locationDto))
        return defer(async function () {
            console.log('DB PERSISTING DATA')
            return await location.save();
        })
    }
}