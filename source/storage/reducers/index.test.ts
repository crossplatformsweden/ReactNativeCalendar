// storage/reducers/index.test
/// <reference types="jest"/>
import * as types from '../types';
import StorageReducer from './';

const testValue = { value: 'testValue' };

describe('StorageReducer', () => {
  test('should return initial state', () => {
    expect(StorageReducer(undefined, types.StorageState())).toMatchSnapshot();
  });

  test(`should handle ${types.StorageConstants.STORAGE_GOTKEY}`, () => {
    const expectedState = types.StorageState(
      types.StorageConstants.STORAGE_GOTKEY,
      'test',
      testValue
    );
    expect(StorageReducer(null, expectedState)).toEqual(expectedState);
  });

  test(`should handle ${types.StorageConstants.STORAGE_SAVED}`, () => {
    const expectedState = types.StorageState(
      types.StorageConstants.STORAGE_SAVED,
      'test',
      testValue
    );
    expect(StorageReducer(null, expectedState)).toEqual(expectedState);
  });

  test(`should handle ${types.StorageConstants.STORAGE_REMOVEDKEY}`, () => {
    const expectedState = types.StorageState(
      types.StorageConstants.STORAGE_REMOVEDKEY,
      'test'
    );
    expect(StorageReducer(null, expectedState)).toEqual(expectedState);
  });
});
