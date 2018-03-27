import { Book } from '../actions';
import Moment from 'moment';

export enum ParkingConstants {
    BOOKING_ADDED = 'BOOKING_ADDED',
    BOOKING_CHANGED = 'BOOKING_CHANGED',
    BOOKING_CANCELLED = 'BOOKING_CANCELLED',
}

export type Book = typeof Book;

export enum IVehicleType {
    Van= 'Van',
    Truck= 'Truck',
    Sedan = 'Sedan',
    SUV= 'SUV',
    /**
     * AKA Family Car, SV: Kombi
     *
     * @type {'StationWagon'}
     * @memberof IVehicleType
     */
    StationWagon= 'StationWagon',
}

interface IVehicle {
    vehicleType: IVehicleType;
    vehicleModel?: string;
    regNumber: string;
}

interface IPerson {
    firstName: string;
    lastName: string;
}

interface ITimePeriod {
    timeStart: Moment.Moment;
    timeEnd: Moment.Moment;
}
interface ILocation {
    lat: number;
    lon: number;
}

export interface IBooking {
    timeperiod: ITimePeriod;
    location: ILocation;
    vehicle: IVehicle;
    adress: string;
    lessee: IPerson;
}

export interface IBookingState {
    booking: IBooking;
}

export interface IParkingAction extends IBookingState {
    type: ParkingConstants;
}

export class Booking implements IBooking {
    constructor (readonly timeperiod: ITimePeriod, readonly location: ILocation,
        readonly vehicle: IVehicle, readonly adress: string, readonly lessee: IPerson ) {

        }
}
