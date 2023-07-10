import * as types from '../actions/actionTypes';

const initialState = {
    inspectionData: {}
};

export default function inspectionReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_INSPECTION_DATA:
            return Object.assign({}, state, {
                inspectionData: action.inspectionData
            });
        default:
            return state;
    }
}
