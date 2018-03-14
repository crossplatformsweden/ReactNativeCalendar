// storage/actions/index
import _ from 'lodash';
import { AsyncStorage } from 'react-native';
import * as Redux from 'redux';
import * as storageTypes from '../types';

import { AppLoadingChanged, AppErrorChanged } from '../../utility';

const saveByKey = 'SaveByKey';

/**
 * Tries to save to app storage
 * @function SaveByKey
 * @param {string} key - key to store by
 * @param {Object} value - value to store (will be serialized)
 * @returns {Promise<SaveByKeyDispatch>} - result of save operation
 * @public
 * @memberof StorageActions
 */
export const SaveByKey = (key: string, value: object) =>
async (dispatch: Redux.Dispatch<storageTypes.IStorageAction>) => {
  /**
   * The resulting dispatch
   * @type {SaveByKeyDispatch}
   */
  let resultDispatch = null;
  dispatch(AppLoadingChanged({
    isBusy: true,
    reason: storageTypes.StorageConstants.STORAGE_BUSY,
    sender: saveByKey,
  }));
  if (_.isNil(key) || _.isNil(value)) {
    dispatch(AppErrorChanged({
      hasError: true,
      reason: 'Key or value was null',
      exception: storageTypes.StorageConstants.STORAGE_SAVE_FAILED,
      sender: saveByKey,
    }));
  }

  const model = JSON.stringify(value);

  try {
    await AsyncStorage.setItem(key, model, (e) => {
      if (!_.isNil(e)) {
        dispatch(AppErrorChanged({
          hasError: true,
          reason: storageTypes.StorageConstants.STORAGE_SAVE_FAILED,
          exception: e.message,
          sender: saveByKey,
        }));
      }
    });

    resultDispatch = { type: storageTypes.StorageConstants.STORAGE_SAVED, key, value };
    dispatch(resultDispatch);
    dispatch(AppErrorChanged({ hasError: false, sender: saveByKey }));
  } catch (e) {
    dispatch(AppErrorChanged({
      hasError: true,
      reason: storageTypes.StorageConstants.STORAGE_SAVE_FAILED,
      exception: e,
      sender: saveByKey,
    }));
  } finally {
    dispatch(AppLoadingChanged({ isBusy: false, sender: saveByKey }));
  }
};

export type SaveByKey = typeof SaveByKey;

const removeKey = 'RemoveKey';

/**
 * Tries to remove object from storage for the specified key
 * @function RemoveKey
 * @param {string} key - the key to search for in app storage
 * @returns {Promise<RemoveKeyDispatch>} - the resulting dispatch.
 * @public
 * @memberof StorageActions
 */
export const RemoveKey = (key: string) =>
async (dispatch: Redux.Dispatch<storageTypes.IStorageAction>) => {
  /**
   * The resulting dispatch
   * @type {RemoveKeyDispatch}
   */
  let resultDispatch = null;
  dispatch(AppLoadingChanged({
    isBusy: true,
    reason: storageTypes.StorageConstants.STORAGE_BUSY,
    sender: removeKey,
  }));

  await AsyncStorage.removeItem(key, (e) => {
    if (_.isNil(e)) {
      resultDispatch = { type: storageTypes.StorageConstants.STORAGE_REMOVEDKEY, key };
      dispatch(resultDispatch);
    } else {
      dispatch(AppErrorChanged({
        hasError: true,
        reason: storageTypes.StorageConstants.STORAGE_REMOVED_FAILED,
        exception: e.message,
        sender: removeKey,
      }));
    }

    dispatch(AppLoadingChanged({ isBusy: false, sender: removeKey }));
  });
};

export type RemoveKey = typeof RemoveKey;

const getByKey = 'GetByKey';

/**
 * Tries to get object from storage for the specified key
 * @function GetByKey
 * @param {string} key - the key to search for in app storage
 * @returns {Promise<GetByKeyDispatch>} - the result of get operation.
 * @public
 * @memberof StorageActions
 */
export const GetByKey = (key: string ) => async (dispatch: Redux.Dispatch<storageTypes.IStorageAction>) => {
  /**
   * The resulting dispatch
   * @type {GetByKeyDispatch}
   */
  let resultDispatch = null;
  dispatch(AppLoadingChanged({
    isBusy: true,
    reason: storageTypes.StorageConstants.STORAGE_BUSY,
    sender: getByKey,
  }));

  try {
    const res = await AsyncStorage.getItem(key);
    if (_.isNil(res)) {
      dispatch(AppErrorChanged({
        hasError: true,
        reason: storageTypes.StorageConstants.STORAGE_NOSUCHKEY,
        sender: getByKey,
      }));
    }

    const model = JSON.parse(res);
    if (!_.isNil(model)) {
      // Object was found in storage and deserialized
      resultDispatch = {
        type: storageTypes.StorageConstants.STORAGE_GOTKEY,
        value: model,
        key,
      };
      dispatch(resultDispatch);
      dispatch(AppErrorChanged({ hasError: false, sender: getByKey }));
    } else {
      dispatch(AppErrorChanged({
        hasError: true,
        reason: storageTypes.StorageConstants.STORAGE_NOSUCHKEY,
        sender: getByKey,
      }));
    }
  } catch (ex) {
    dispatch(AppErrorChanged({
      hasError: true,
      reason: storageTypes.StorageConstants.STORAGE_NOSUCHKEY,
      exception: ex,
      sender: getByKey,
    }));
  } finally {
    dispatch(AppLoadingChanged({ isBusy: false, sender: getByKey }));
  }
};

export type GetByKey = typeof GetByKey;