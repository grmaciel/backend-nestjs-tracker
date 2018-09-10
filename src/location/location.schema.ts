import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema({
    latitude: String,
    longitude: String,
});

mongoose.model('Location', LocationSchema)