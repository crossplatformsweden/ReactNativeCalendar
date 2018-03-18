// navigator/reducers/index.test
/// <reference types="jest"/>
import AppNavReducer from './index';

describe('AuthReducer', () => {
  test('should return initial state', () => {
    expect(
      AppNavReducer(undefined, { type: null, scene: {} })
    ).toMatchSnapshot();
  });
  const mockScene = { path: '/home' };

  test(`should handle focus`, () => {
    expect(
      AppNavReducer(undefined, { type: 'focus', scene: mockScene })
    ).toEqual({
      scene: mockScene,
    });
  });
});
