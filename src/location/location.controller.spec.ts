import { Test } from '@nestjs/testing'
import { LocationController } from './location.controller'
import { LocationService } from './location.service';

describe('LocationController', () => {
    let locationController: LocationController
    let locationService: LocationService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [LocationController],
            providers: [LocationService],
        }).compile();

        locationService = module.get<LocationService>(LocationService);
        locationController = module.get<LocationController>(LocationController);
    })

    describe('locations', () => {
        it('should return user locations', async () => {
            const result = 'all user location';
            locationController.locations().subscribe(value => {
                expect(value).toBe(result)
            })
        })
    })

    describe('trackLocation', () => {
        it('should persist user location', async () => {
            const result = 'user location lat: 450 long: 320';
            // jest.spyOn(locationService, 'trackLocation').mockImplementation(() => result)
            expect(locationController.trackLocation({ latitude: '450', longitude: '320' })).toBe(result)
        })
    })
})