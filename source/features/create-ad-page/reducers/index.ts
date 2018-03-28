import * as types from '../types';
import moment from 'moment';

// Default state!
//
const initialState: types.ICreateState = {
    createAd: { fromDate: moment(),
                toDate: moment()},
};

function CreateAdPageState(
createAd: types.ICreateAdPage
    ): types.ICreateState {
        const newState: types.ICreateState = {
            createAd,
        };
        return newState;
    }

const CreateAdReducer = (
    state = initialState,
    action: types.ICreateAction
): types.ICreateState => {
    switch (action.type) {
        case types.CreateConstants.CREATE_CANCEL:
            return Object.assign({}, state, CreateAdPageState(null));
        case types.CreateConstants.CREATE_SUCCESS:
            return Object.assign({}, state, action.createAd);
        default:
            return state;
    }
};

export default CreateAdReducer;