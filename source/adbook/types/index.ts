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

export interface IVehicle {
    vehicleType: IVehicleType;
    vehicleModel?: string;
    regNumber: string;
}

export interface IPerson {
    firstName: string;
    lastName: string;
}

export interface ITimePeriod {
    timeStart: Moment.Moment;
    timeEnd: Moment.Moment;
}
export interface ILocation {
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
    // TODO: Default values (time period etc)

    constructor (readonly timeperiod: ITimePeriod = null, readonly location: ILocation = null,
        readonly vehicle: IVehicle = null, readonly adress: string = '', readonly lessee: IPerson = null ) {
            if (!timeperiod) { this.timeperiod = {timeStart: Moment(), timeEnd: Moment()}; }
            if (!location) { this.location = {lat: 0, lon: 0}; }
            if (!vehicle) { this.vehicle = {vehicleType: IVehicleType.Sedan, vehicleModel: '', regNumber: ''}; }
            if (!adress) {this.adress = ''; }
            if (!lessee) {this.lessee = {firstName: '', lastName: ''}; }
        }
}
export const ParkingAction = (
    type: ParkingConstants,
    booking: IBooking = new Booking()
): IParkingAction => {
    const result: IParkingAction = {
        type, booking,
    };
    return result;
};
