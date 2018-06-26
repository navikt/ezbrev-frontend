import * as types from '../actions/actionTypes';

export default function brevdataReducer(state = {}, action) {
    switch (action.type) {
        case types.SAVE_BREVDATA:
            return Object.assign({}, action.brevdata);

        default:
            return state;
    }
}
