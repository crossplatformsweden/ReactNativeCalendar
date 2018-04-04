// login/reducers/index.test
/// <reference types="jest"/>
import * as types from '../types';
import LoginReducer from '../reducers';

const userMock: types.IUser = {
  accessToken: 'x',
  name: 'test',
  picture: 'http://',
  type: 'Google',
  autologin: false,
};

describe('LoginReducer', () => {
  test('should return initial state', () => {
    expect(
      LoginReducer(undefined, { type: null, isLoggedIn: false })
    ).toMatchSnapshot();
  });
  test(`should handle ${types.LoginConstants.LOGIN_FAILED}`, () => {
    const expectedState = types.LoginState(
      types.LoginConstants.LOGIN_FAILED,
      null,
      false
    );

    expect(LoginReducer(null, expectedState)).toEqual(expectedState);
  });

  test(`should handle ${types.LoginConstants.LOGIN_SUCCESS}`, () => {
    const expectedState = types.LoginState(
      types.LoginConstants.LOGIN_SUCCESS,
      userMock,
      true
    );

    expect(LoginReducer(null, expectedState)).toEqual(expectedState);
  });
});
