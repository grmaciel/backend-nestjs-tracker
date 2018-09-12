import { Injectable } from "@nestjs/common";
import { Observable, of, defer, fromEvent } from "rxjs";
import { LocationTrackDto } from "./dto/location-track.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Location } from "./location.interface";

@Injectable()
export class LocationService {
    constructor(@InjectModel('Location') private readonly locationModel: Model<Location>) { }

    locations(): Observable<Location[]> {
        return defer(() => this.locationsPromise())
    }

    private locationsPromise(): Promise<Location[]> {
        return this.locationModel.find().lean().exec()
    }

    trackLocation(locationDto: LocationTrackDto): Observable<Location> {
        const location = new this.locationModel(locationDto)
        return defer(async function () {
            return await location.save()
        })
    }
}