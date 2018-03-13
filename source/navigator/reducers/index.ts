import * as types from '../types/';

const initialState: types.INavigationState = {
  scene: {},
};

const AppNavigatorReducer = (
  state = initialState,
  action: types.INavigationAction
): types.INavigationState => {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case 'focus':
      return Object.assign({}, state, {
        scene: action.scene,
      });
    default:
      return state;
  }
};

export default AppNavigatorReducer;
