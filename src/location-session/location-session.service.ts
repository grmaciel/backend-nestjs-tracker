import { Injectable } from "@nestjs/common";
import { LocationSession } from './location-session.interface';
import { Observable, of, defer, fromEvent } from "rxjs";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class LocationSessionService {
    // constructor() { }
    constructor(@InjectModel('LocationSession') private readonly locationModel: Model<LocationSession>) { }

    startSession(): Observable<LocationSession> {
        let model = new this.locationModel({ start: new Date(), end: null })
        return defer(async function () {
            return await model.save()
        })
    }

    endSession(id: string): Observable<LocationSession> {
        let model = this.locationModel

        return defer(async function () {
            return await model.findByIdAndUpdate(id, { end: new Date() }, { new: true })
        })
    }

    private async updateModelById(id: string): Promise<LocationSession> {
        return await this.locationModel.findByIdAndUpdate(id, { end: new Date() }).exec()
    }

    activeSession() {
        // TODO: WE NEED TO RETURN THIS SOMEWHEN
    }
}