import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from '../src/location/location.module';
import { Location } from '../src/location/location.interface';
import { LocationSchema } from '../src/location/location.schema';

describe('Mongoose', () => {
  let server;
  let app: INestApplication;

  beforeAll(async () => {
    const mongoose = require('mongoose');
    await mongoose.connect('mongodb://localhost/test');
    let model = mongoose.model('Location', LocationSchema)
    let remove = model.collection.remove()
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
      .expect({
        data: 'yay'
      })
    // .expect(({ body }) => body.data == location.latitude);
    // console.log('body: ' + JSON.stringify(res.body))
    // expect(res.body.data.latitude).toBe('200')
    // expect(res.body.data.longitude).toBe('320')
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await app.close();
  })
});