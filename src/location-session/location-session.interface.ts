import { Document } from 'mongoose';

export interface LocationSession extends Document {
    readonly start: Date,
    readonly end: Date,
}