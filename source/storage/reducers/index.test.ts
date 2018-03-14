// storage/reducers/index.test
import * as types from '../types';
import StorageReducer from './';

const testValue = { value: 'testValue' };

describe('StorageReducer', () => {
  test('should return initial state', () => {
    expect(StorageReducer(undefined, {type: null, key: ''}))
      .toMatchSnapshot();
  });

  test(`should handle ${types.StorageConstants.STORAGE_GOTKEY}`, () => {
    expect(StorageReducer(null, {
      type: types.StorageConstants.STORAGE_GOTKEY,
      key: 'test',
      value: testValue,
    }))
      .toEqual({
        key: 'test',
        value: {value: 'testValue'},
      });
  });

  test(`should handle ${types.StorageConstants.STORAGE_SAVED}`, () => {
    expect(StorageReducer(null, {
      type: types.StorageConstants.STORAGE_SAVED,
      key: 'test',
      value: testValue,
    }))
      .toEqual({
        key: 'test',
        value: testValue,
      });
  });

  test(`should handle ${types.StorageConstants.STORAGE_REMOVEDKEY}`, () => {
    expect(StorageReducer(null, {
      type: types.StorageConstants.STORAGE_REMOVEDKEY,
      key: 'test',
    }))
      .toEqual({
        key: 'test',
      });
  });
});
