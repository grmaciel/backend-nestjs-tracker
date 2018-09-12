import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from '../src/location/location.schema';
import { TrackingModule } from '../src/tracking/tracking.module';
import { LocationSessionSchema } from '../src/location-session/location-session.schema';

describe('/tracking endpoint', () => {
    let server;
    let app: INestApplication;
    let sessionId: string

    beforeAll(async () => {
        const mongoose = require('mongoose');
        await mongoose.connect('mongodb://localhost/test');
        let model = mongoose.model('Location', LocationSchema)
        model.collection.deleteMany()
        let session = mongoose.model('LocationSession', LocationSessionSchema)
        session.collection.deleteMany()
    })

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost/test'),
                TrackingModule
            ],
            providers: [
                // LocationSessionService
            ]
        }).compile();
        app = module.createNestApplication();
        server = app.getHttpServer();
        await app.init();
    });

    // should start session

    // should end session and put end date
    it(`POST /should return session with start date and an id `, async () => {
        let res = await request(server)
            .post('/tracking')
            .expect(201)
        expect(res.body.data.start).toBeTruthy()
        expect(res.body.data.end).toBeFalsy()
        this.sessionId = res.body.data._id
    })

    it(`PUT /tracking should create Location entity`, async () => {
        const location = {
            latitude: '200',
            longitude: '320',
        };
        let res = await request(server)
            .put('/tracking/' + this.sessionId)
            .send(location)
            .expect(201)
        expect(res.body.data.latitude).toBe('200')
        expect(res.body.data.longitude).toBe('320')
    })

    it(`GET /tracking should return just created entity`, async () => {
        let res = await request(server)
            .get('/tracking')
            .expect(200)
        expect(res.body.data[0].latitude).toBe('200')
        expect(res.body.data[0].longitude).toBe('320')
        expect(res.body.data.length).toBe(1)
    });

    it(`POST /should return session with end date`, async () => {
        let res = await request(server)
            .post('/tracking/' + this.sessionId)
            .expect(201)
        console.log('updated received data: ' + JSON.stringify(res.body.data))
        expect(res.body.data.start).toBeTruthy()
        expect(res.body.data.end).toBeTruthy()
    })

    afterEach(async () => {
        await app.close();
        const mongoose = require('mongoose');
        await mongoose.connection.close(function () {
            console.log('Mongoose connection disconnected');
        });
    });ƒ
});