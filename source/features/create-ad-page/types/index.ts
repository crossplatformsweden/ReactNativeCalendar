// import { CreateAd } from '../actions';
// export type CreateAd = typeof CreateAd;
import moment from 'moment';

export enum CreateConstants {
    CREATE_SUCCESS = 'CREATE DID SUCCESS',
    CREATE_UPDATED = 'CREATE DID UPDATE',
    CREATE_CANCEL = 'CREATE DID CANCEL',
}

export interface IUser {
    accessToken: string;
    name: string;
    type: string;
  }

export interface ICreateAdPage {
    fromDate: moment.Moment;
    toDate: moment.Moment;
}

export interface ICreateState {
    createAd: ICreateAdPage;
}

export interface ICreateAction extends ICreateState {
    type: CreateConstants;
}