import * as Redux from 'redux';
import * as types from '../types';

export const Book = (book: types.IBooking, bookingaction: types.ParkingConstants) => async (
    dispatch: Redux.Dispatch<types.IParkingAction>
) => {
        const booking = new types.Booking(
            book.timeperiod,
            book.location,
            book.vehicle,
            book.adress,
            book.lessee
        );

        const emptybooking = new types.Booking(
            null, null, null, null, null
        );

        const changedbooking = new types.Booking(
            booking.timeperiod,
            booking.location,
            booking.vehicle,
            booking.adress,
            booking.lessee
        );

        if (bookingaction === types.ParkingConstants.BOOKING_ADDED) {

            const theBooking: types.IParkingAction = {
                type: types.ParkingConstants.BOOKING_ADDED,
                booking: booking,
              };

            dispatch(theBooking);
            return;
        }

        if (bookingaction === types.ParkingConstants.BOOKING_CANCELLED) {

            const theBooking: types.IParkingAction = {
                type: types.ParkingConstants.BOOKING_CANCELLED,
                booking: emptybooking,
              };

            dispatch(theBooking);
            return;
        }

        if (bookingaction === types.ParkingConstants.BOOKING_CHANGED) {
            const theBooking: types.IParkingAction = {
                type: types.ParkingConstants.BOOKING_CHANGED,
                booking: changedbooking,
              };
            dispatch(theBooking);
        }

};