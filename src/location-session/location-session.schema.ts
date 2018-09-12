import * as mongoose from 'mongoose';

export const LocationSessionSchema = new mongoose.Schema({
    start: Date,
    end: Date,
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
})