// login/reducers/index.test
import * as types from '../types';
import LoginReducer from '../reducers';

const userMock: types.IUser = {
  accessToken: 'x',
  name: 'test',
  picture: 'http://',
  type: 'Google',
};

describe('LoginReducer', () => {
  test('should return initial state', () => {
    expect(
      LoginReducer(undefined, { type: null, isLoggedIn: false })
    ).toMatchSnapshot();
  });
  test(`should handle ${types.LoginConstants.LOGIN_FAILED}`, () => {
    const loginAction: types.ILoginAction = {
      type: types.LoginConstants.LOGIN_FAILED,
      isLoggedIn: false,
      user: null,
    };

    const expectedState: types.ILoginState = {
      isLoggedIn: false,
      user: null,
    };

    expect(LoginReducer(null, loginAction)).toEqual(expectedState);
  });

  test(`should handle ${types.LoginConstants.LOGIN_SUCCESS}`, () => {
    const loginAction: types.ILoginAction = {
      type: types.LoginConstants.LOGIN_SUCCESS,
      isLoggedIn: true,
      user: userMock,
    };
    const expectedState: types.ILoginState = {
      isLoggedIn: true,
      user: userMock,
    };
    expect(LoginReducer(null, loginAction)).toEqual(expectedState);
  });
});
