// login/actions/index
import * as Redux from 'redux';

import * as types from '../types';
import moment from 'moment';

let createAdAction: types.ICreateAction;

/**
 * @function Create ad booking
 * @returns {UserDispatch}
 * @memberof createAd
 * @public
 * @global
 */

export const CreateAd = () => (
  dispatch: Redux.Dispatch<types.ICreateAction>
) => {
  createAdAction = {
    type: types.CreateConstants.CREATE_SUCCESS,
    createAd: { fromDate: moment(),
      toDate: moment().add(1, 'h'),
    },
  };
  dispatch(
    createAdAction
  );
  return;
};
export type CreateAd = typeof CreateAd;

export const UpdateAd = (createAd: types.ICreateAdPage) => (
  dispatch: Redux.Dispatch<types.ICreateAction>
) => {
  createAdAction = {
    type: types.CreateConstants.CREATE_UPDATED,
    createAd,
  };
  dispatch(
    createAdAction
  );
  return;
};
export type UpdateAd = typeof UpdateAd;