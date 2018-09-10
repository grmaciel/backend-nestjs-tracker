import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { LocationModule } from 'location/location.module';

describe('Location', () => {
    let app: INestApplication;
    // let locationService = { locations: () => 'all user location', trackLocation: () => { } }

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                LocationModule
            ],
            providers: [],
            controllers: []

        })
            // .overrideProvider(LocationService)
            // .useValue(locationService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/GET location`, () => {
        return request(app.getHttpServer())
            .get('/location')
            .expect(200)
            .expect({
                data: 'all user locations',
            })
    })

    it(`/PUT location`, () => {
        return request(app.getHttpServer())
            .put('/location')
            .send({ latitude: '450', longitude: '300' })
            .expect(201)
            .expect({
                data: 'user location lat: 450 long: 300'
            })
    })

    afterAll(async () => {
        await app.close()
    })
})

