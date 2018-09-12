import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema({
    latitude: String,
    longitude: String,
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'LocationSession'}
})