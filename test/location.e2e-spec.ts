import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from '../src/location/location.module';
import { LocationSchema } from '../src/location/location.schema';

describe('Mongoose', () => {
    let server;
    let app: INestApplication;

    beforeAll(async () => {
        const mongoose = require('mongoose');
        await mongoose.connect('mongodb://localhost/test');
        let model = mongoose.model('Location', LocationSchema)
        model.collection.deleteMany()
    })

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost/test'),
                LocationModule
            ],
        }).compile();
        app = module.createNestApplication();
        server = app.getHttpServer();
        await app.init();
    });

    it(`PUT /location should create Location entity`, async () => {
        const location = {
            latitude: '200',
            longitude: '320',
        };
        let res = await request(server)
            .put('/location')
            .send(location)
            .expect(201)
        expect(res.body.data.latitude).toBe('200')
        expect(res.body.data.longitude).toBe('320')
    })

    it(`GET /location should return just created entity`, async () => {
        let res = await request(server)
            .get('/location')
            .expect(200)
        expect(res.body.data[0].latitude).toBe('200')
        expect(res.body.data[0].longitude).toBe('320')
        expect(res.body.data.length).toBe(1)
    });

    afterEach(async () => {
        await app.close();
        const mongoose = require('mongoose');
        await mongoose.connection.close(function () {
            console.log('Mongoose connection disconnected');
        });
    });

    afterAll(async (done) => {
        const mongoose = require('mongoose');
        // let model = mongoose.model('Location', LocationSchema)
        // model.collection.deleteMany()
        // await mongoose.connection.close(function () {
        //     console.log('Mongoose connection disconnected');
        // });
        await mongoose.disconnect();
        await app.close();
        // await server.close(function () {
        //     console.log('server closing')
        // })
        done()
    })
});