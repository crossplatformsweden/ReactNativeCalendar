import configureMockStore, {MockStore} from 'redux-mock-store';
import {Book} from './index';
import { Store } from '../../Store';
import * as types from '../types';
import { IVehicleType, IParkingAction } from '../types/index';
import Moment from 'moment';

const storeMock = configureMockStore<Store>();

const bookingModel: types.IBooking = {
    timeperiod: {timeEnd: Moment(), timeStart: Moment()},
    location: {lat: 1203, lon: 201},
    vehicle: {vehicleType: IVehicleType.SUV, vehicleModel: 'Volvo', regNumber: 'AAA123'},
    adress: 'Någongata 37',
    lessee: {firstName: 'Martin', lastName: 'Ström'},
};

describe('Book', () => {
    beforeEach(() => {
         // @ts-ignore
        storeMock.clearActions();
    });
    test('Book returns ADDED', async () => {
        const expectedReply: types.IParkingAction = {
            booking: bookingModel,
            type: types.ParkingConstants.BOOKING_ADDED,
        };
        const expectedActions = [
            expectedReply,
        ];
        // @ts-ignore
        await storeMock.dispatch(Book(bookingModel, types.ParkingConstants.BOOKING_ADDED));

        // @ts-ignore
        expect(storeMock.getActions()).toMatchSnapshot();

        // @ts-ignore
        expect(storeMock.getActions()).toEqual(expectedActions);

    });
});