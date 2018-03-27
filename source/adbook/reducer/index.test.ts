import * as types from '../types';
import BookingReducer from './index';

const bookMock: types.IBooking = {
    timeperiod: {timeStart: null, timeEnd: null},
    location: {lat: 1203, lon: 201},
    vehicle: {vehicleType: null, vehicleModel: 'Volvo', regNumber: 'KKK123'},
    adress: 'någongata 37',
    lessee: null,
};

describe('BookReducer', () => {
    test('should return initial state', () => {
        expect(BookingReducer(undefined, {type: null, booking: null}))
        .toMatchSnapshot();
    });

    test('should handle CANCELLED action', () => {

        const bookAction: types.IParkingAction = {
            type: types.ParkingConstants.BOOKING_CANCELLED,
            booking: null,
        };

        const expectedState: types.IBookingState = {
            booking: null,
        };

        expect(BookingReducer(null, bookAction)).toEqual(expectedState);
    });

    test('should handle ADD action', () => {

        const bookAction: types.IParkingAction = {
            type: types.ParkingConstants.BOOKING_ADDED,
            booking: bookMock,
        };

        const expectedState: types.IBookingState = {
            booking: bookMock,
        };

        expect(BookingReducer(null, bookAction)).toEqual(expectedState);
    });

    test('should handle CHANGED action', () => {

        const bookAction: types.IParkingAction = {
            type: types.ParkingConstants.BOOKING_CHANGED,
            booking: bookMock,
        };

        const expectedState: types.IBookingState = {
            booking: bookMock,
        };

        expect(BookingReducer(null, bookAction)).toEqual(expectedState);
    });

});