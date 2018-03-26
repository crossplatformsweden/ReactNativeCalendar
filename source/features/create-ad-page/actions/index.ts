// login/actions/index
import * as Redux from 'redux';
import axios from 'axios';
import { Constants } from 'expo';

import * as types from '../types';
import { AppErrorChanged, AppLoadingChanged } from '../../../utility/';
import { StorageTypes, SaveByKey } from '../../../storage';
import moment from 'moment';

let createAdAction: types.ICreateAction;

/**
 * @function Create ad booking
 * @returns {UserDispatch}
 * @memberof createAd
 * @public
 * @global
 */

export const CreateAd = () => async (
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