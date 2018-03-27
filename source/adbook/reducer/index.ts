import * as bookingtypes from '../types';

function CreateBookingState(booking: bookingtypes.IBooking): bookingtypes.IBookingState {
    return {
        booking,
    };
}

const initialState: bookingtypes.IBookingState = {
    booking: null,
};

const BookingReducer = ( state = initialState, action: bookingtypes.IParkingAction): bookingtypes.IBookingState => {
    switch (action.type) {
        case bookingtypes.ParkingConstants.BOOKING_ADDED:
            return Object.assign({}, state, CreateBookingState(action.booking));
        case bookingtypes.ParkingConstants.BOOKING_CHANGED:
            return Object.assign({}, state, CreateBookingState(action.booking));
        case bookingtypes.ParkingConstants.BOOKING_CANCELLED:
            return Object.assign({}, state, CreateBookingState(null));
        default:
            return state;
    }
};

export default BookingReducer;